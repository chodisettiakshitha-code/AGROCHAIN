from algopy import (
    ARC4Contract,
    Account,
    BoxMap,
    Global,
    GlobalState,
    String,
    Txn,
    UInt64,
    arc4,
    gtxn,
)


class Product(arc4.Struct):
    id: arc4.UInt64
    farmer: arc4.Address
    name: arc4.String
    category: arc4.String
    description: arc4.String
    quantity: arc4.UInt64
    price_per_unit: arc4.UInt64
    unit: arc4.String
    location: arc4.String
    harvest_date: arc4.String
    status: arc4.String
    created_at: arc4.UInt64


class Order(arc4.Struct):
    order_id: arc4.UInt64
    product_id: arc4.UInt64
    farmer: arc4.Address
    customer: arc4.Address
    quantity: arc4.UInt64
    price_per_unit: arc4.UInt64
    total_amount: arc4.UInt64
    order_timestamp: arc4.UInt64
    status: arc4.String


class FarmerRecord(arc4.Struct):
    farmer_address: arc4.Address
    name: arc4.String
    registered_at: arc4.UInt64


class AgroChainMarketplace(ARC4Contract):
    def __init__(self) -> None:
        self.product_counter = GlobalState(UInt64(0))
        self.order_counter = GlobalState(UInt64(0))
        self.farmers = BoxMap(Account, FarmerRecord)
        self.products = BoxMap(UInt64, Product)
        self.orders = BoxMap(UInt64, Order)

    @arc4.abimethod
    def register_farmer(self, name: String) -> None:
        """Register the caller (Txn.sender) as a farmer."""
        assert name.bytes.length > 0, "Name cannot be empty"
        assert Txn.sender not in self.farmers, "Farmer already registered"

        record = FarmerRecord(
            farmer_address=arc4.Address(Txn.sender),
            name=arc4.String(name),
            registered_at=arc4.UInt64(Global.latest_timestamp),
        )
        self.farmers[Txn.sender] = record.copy()

    @arc4.abimethod
    def is_farmer(self, address: Account) -> bool:
        """Check if an address is registered as a farmer."""
        return address in self.farmers

    @arc4.abimethod
    def get_farmer(self, address: Account) -> FarmerRecord:
        """Get farmer details for an address."""
        assert address in self.farmers, "Farmer not found"
        return self.farmers[address].copy()

    @arc4.abimethod
    def create_product(
        self,
        name: String,
        category: String,
        description: String,
        quantity: UInt64,
        price_per_unit: UInt64,
        unit: String,
        location: String,
        harvest_date: String,
    ) -> UInt64:
        """Create a new agricultural product listing (farmer only)."""
        assert Txn.sender in self.farmers, "Only registered farmers can list products"
        assert quantity > 0, "Quantity must be greater than zero"
        assert price_per_unit > 0, "Price per unit must be greater than zero"

        new_id = self.product_counter.value + UInt64(1)
        self.product_counter.value = new_id

        product = Product(
            id=arc4.UInt64(new_id),
            farmer=arc4.Address(Txn.sender),
            name=arc4.String(name),
            category=arc4.String(category),
            description=arc4.String(description),
            quantity=arc4.UInt64(quantity),
            price_per_unit=arc4.UInt64(price_per_unit),
            unit=arc4.String(unit),
            location=arc4.String(location),
            harvest_date=arc4.String(harvest_date),
            status=arc4.String("Available"),
            created_at=arc4.UInt64(Global.latest_timestamp),
        )
        self.products[new_id] = product.copy()
        return new_id

    @arc4.abimethod
    def get_product(self, product_id: UInt64) -> Product:
        """Fetch product listing details by ID."""
        assert product_id in self.products, "Product does not exist"
        return self.products[product_id].copy()

    @arc4.abimethod
    def purchase_product(
        self,
        product_id: UInt64,
        quantity: UInt64,
        pay_txn: gtxn.PaymentTransaction,
    ) -> UInt64:
        """Purchase product from a farmer with an atomic payment transaction."""
        assert product_id in self.products, "Product does not exist"
        prod = self.products[product_id].copy()
        assert prod.status.native == "Available", "Product is not available"

        curr_quantity = prod.quantity.native
        assert quantity > 0, "Requested quantity must be greater than zero"
        assert quantity <= curr_quantity, "Requested quantity exceeds available stock"

        farmer_addr = Account(prod.farmer.bytes)
        assert Txn.sender != farmer_addr, "Farmer cannot purchase their own product"

        unit_price = prod.price_per_unit.native
        total_price = unit_price * quantity

        # Verify payment transaction
        assert pay_txn.sender == Txn.sender, "Payment transaction sender must match buyer"
        assert pay_txn.receiver == farmer_addr, "Payment must be made to product farmer"
        assert pay_txn.amount == total_price, "Payment amount does not match total price"

        # Update product quantity and status
        new_quantity = curr_quantity - quantity

        if new_quantity > 0:
            status_str = arc4.String("Available")
        else:
            status_str = arc4.String("Sold Out")

        updated_product = Product(
            id=prod.id,
            farmer=prod.farmer,
            name=prod.name,
            category=prod.category,
            description=prod.description,
            quantity=arc4.UInt64(new_quantity),
            price_per_unit=prod.price_per_unit,
            unit=prod.unit,
            location=prod.location,
            harvest_date=prod.harvest_date,
            status=status_str,
            created_at=prod.created_at,
        )
        self.products[product_id] = updated_product.copy()

        # Create order
        new_order_id = self.order_counter.value + UInt64(1)
        self.order_counter.value = new_order_id

        order = Order(
            order_id=arc4.UInt64(new_order_id),
            product_id=arc4.UInt64(product_id),
            farmer=prod.farmer,
            customer=arc4.Address(Txn.sender),
            quantity=arc4.UInt64(quantity),
            price_per_unit=prod.price_per_unit,
            total_amount=arc4.UInt64(total_price),
            order_timestamp=arc4.UInt64(Global.latest_timestamp),
            status=arc4.String("PAID"),
        )
        self.orders[new_order_id] = order.copy()
        return new_order_id

    @arc4.abimethod
    def get_order(self, order_id: UInt64) -> Order:
        """Fetch order details by ID."""
        assert order_id in self.orders, "Order does not exist"
        return self.orders[order_id].copy()

    @arc4.abimethod
    def update_order_status(self, order_id: UInt64, new_status: String) -> None:
        """Update status of an order ('CONFIRMED', 'COMPLETED', 'CANCELLED')."""
        assert order_id in self.orders, "Order does not exist"
        ord_item = self.orders[order_id].copy()

        farmer_addr = Account(ord_item.farmer.bytes)
        customer_addr = Account(ord_item.customer.bytes)

        if new_status == "CONFIRMED" or new_status == "COMPLETED":
            assert Txn.sender == farmer_addr, "Only farmer can confirm or complete order"
        elif new_status == "CANCELLED":
            assert Txn.sender == farmer_addr or Txn.sender == customer_addr, "Unauthorized to cancel order"
        else:
            assert False, "Invalid order status"

        updated_order = Order(
            order_id=ord_item.order_id,
            product_id=ord_item.product_id,
            farmer=ord_item.farmer,
            customer=ord_item.customer,
            quantity=ord_item.quantity,
            price_per_unit=ord_item.price_per_unit,
            total_amount=ord_item.total_amount,
            order_timestamp=ord_item.order_timestamp,
            status=arc4.String(new_status),
        )
        self.orders[order_id] = updated_order.copy()

    @arc4.abimethod
    def get_counters(self) -> arc4.Tuple[arc4.UInt64, arc4.UInt64]:
        """Return total products created and total orders created."""
        return arc4.Tuple(
            (arc4.UInt64(self.product_counter.value), arc4.UInt64(self.order_counter.value))
        )
