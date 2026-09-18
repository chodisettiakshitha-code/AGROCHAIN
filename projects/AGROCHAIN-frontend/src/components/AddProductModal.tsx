import React, { useState, useRef } from 'react'
import { Product, CATEGORIES } from '../types/agrochain'
import {
  X,
  PlusCircle,
  Sprout,
  Upload,
  Image as ImageIcon,
  Camera,
  Trash2,
  Check,
  Sparkles,
} from 'lucide-react'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    productData: Omit<Product, 'id' | 'farmer' | 'status' | 'createdAt' | 'pricePerUnitAlgo'>
  ) => Promise<boolean>
}

const PRESET_IMAGES = [
  {
    name: 'Fresh Tomatoes',
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    icon: '🍅',
  },
  {
    name: 'Banganapalli Mangoes',
    url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    icon: '🥭',
  },
  {
    name: 'Organic Rice',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    icon: '🌾',
  },
  {
    name: 'Mixed Vegetables',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    icon: '🥦',
  },
  {
    name: 'Pure Dairy Milk',
    url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    icon: '🥛',
  },
]

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<string>('Vegetables')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState<number>(100)
  const [unit, setUnit] = useState('kg')
  const [pricePerUnit, setPricePerUnit] = useState<number>(20)
  const [location, setLocation] = useState('Vijayawada, AP')
  const [harvestDate, setHarvestDate] = useState('2026-08-12')
  
  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  // Handle File Upload & Convert to Data URL
  const handleImageFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        setImagePreview(reader.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFileChange(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileChange(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description || quantity <= 0 || pricePerUnit <= 0) return

    setSubmitting(true)
    try {
      const finalImage =
        imagePreview ||
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'

      const success = await onSubmit({
        name,
        category,
        description,
        quantity: Number(quantity),
        unit,
        pricePerUnit: Number(pricePerUnit),
        location,
        harvestDate,
        imageUrl: finalImage,
      })
      if (success) {
        onClose()
        setName('')
        setDescription('')
        setImagePreview('')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">List New Produce</h3>
            <p className="text-xs text-slate-500">Record agricultural listing on Algorand Smart Contract</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Fresh Organic Tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm bg-white"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Unit Type *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm bg-white"
              >
                <option value="kg">kg (Kilogram)</option>
                <option value="quintal">quintal (100 kg)</option>
                <option value="liter">liter</option>
                <option value="box">box</option>
                <option value="piece">piece</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Total Available Quantity *
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Price per Unit (₹) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Farm Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vijayawada, AP"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Harvest Date *
              </label>
              <input
                type="date"
                required
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Describe farming practice, quality grade, freshness..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
            />
          </div>

          {/* PRODUCT IMAGE UPLOAD SECTION */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Product Image Upload *
            </label>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {imagePreview ? (
              /* Image Upload Preview Box */
              <div className="relative rounded-2xl overflow-hidden border border-emerald-300 bg-slate-900 group max-h-48 flex items-center justify-center shadow-md">
                <img
                  src={imagePreview}
                  alt="Produce Preview"
                  className="w-full h-44 object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                  <span className="text-xs font-bold text-emerald-300 flex items-center space-x-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Produce Image Selected</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setImagePreview('')}
                    className="p-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition-all flex items-center space-x-1"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Change</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop File Upload Dropzone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]'
                    : 'border-slate-300 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Click to upload image or drag & drop file
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Supports JPG, PNG, WEBP from camera or gallery
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Farm Image Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Or select a sample crop photo:</span>
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImagePreview(preset.url)}
                    className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                      imagePreview === preset.url
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-200 flex items-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>Publishing to Blockchain...</span>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>List Product on Blockchain</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
