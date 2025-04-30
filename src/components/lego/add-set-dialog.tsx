"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Plus, Loader2 } from "lucide-react"
import Image from "next/image"

interface AddSetDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddSet: (setData: any) => void
}

export default function AddSetDialog({ isOpen, onClose, onAddSet }: AddSetDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    setNumber: "",
    theme: "",
    year: new Date().getFullYear(),
    pieces: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pieces" || name === "year" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newSet = {
        ...formData,
        id: Math.random().toString(36).substring(2, 9),
        image: previewImage || "/game.jpg",
      }
      onAddSet(newSet)
      setIsSubmitting(false)
      resetForm()
      onClose()
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      setNumber: "",
      theme: "",
      year: new Date().getFullYear(),
      pieces: 0,
    })
    setPreviewImage(null)
  }

  // Available LEGO themes
  const themes = [
    "Star Wars",
    "City",
    "Technic",
    "Creator Expert",
    "Ideas",
    "Harry Potter",
    "Marvel",
    "DC",
    "Architecture",
    "Friends",
    "Ninjago",
    "Disney",
    "Other",
  ]

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const mobileDialogVariants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { y: "100%", transition: { duration: 0.2 } },
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />

        {/* Dialog - Desktop */}
        <motion.div
          className="hidden md:block bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-10"
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Add New LEGO Set</h2>
            <motion.button
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)]">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Image upload */}
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
                    {previewImage ? (
                      <Image src={previewImage || "/placeholder.svg"} alt="Set preview" fill className="object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Upload size={48} className="mb-2" />
                        <p className="text-sm">Upload set image</p>
                      </div>
                    )}
                  </div>
                  <label className="w-full">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <div className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload size={16} className="mr-2" />
                      {previewImage ? "Change Image" : "Upload Image"}
                    </div>
                  </label>
                </div>

                {/* Right column - Form fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Set Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g. Imperial Star Destroyer"
                    />
                  </div>

                  <div>
                    <label htmlFor="setNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Set Number*
                    </label>
                    <input
                      type="text"
                      id="setNumber"
                      name="setNumber"
                      required
                      value={formData.setNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g. 75252"
                    />
                  </div>

                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                      Theme*
                    </label>
                    <select
                      id="theme"
                      name="theme"
                      required
                      value={formData.theme}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="" disabled>
                        Select a theme
                      </option>
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        id="year"
                        name="year"
                        min="1949"
                        max={new Date().getFullYear()}
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="pieces" className="block text-sm font-medium text-gray-700 mb-1">
                        Pieces
                      </label>
                      <input
                        type="number"
                        id="pieces"
                        name="pieces"
                        min="1"
                        value={formData.pieces}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <motion.button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  onClick={onClose}
                  whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md flex items-center justify-center min-w-[100px]"
                  whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="mr-2" />
                      Add Set
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Dialog - Mobile */}
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl max-h-[90vh] overflow-hidden z-10"
          variants={mobileDialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">Add New LEGO Set</h2>
            <motion.button
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[calc(90vh-60px)]">
            <form onSubmit={handleSubmit}>
              {/* Image upload */}
              <div className="mb-6">
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-4">
                  {previewImage ? (
                    <Image src={previewImage || "/placeholder.svg"} alt="Set preview" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Upload size={36} className="mb-2" />
                      <p className="text-sm">Upload set image</p>
                    </div>
                  )}
                </div>
                <label className="w-full">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <div className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload size={16} className="mr-2" />
                    {previewImage ? "Change Image" : "Upload Image"}
                  </div>
                </label>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Set Name*
                  </label>
                  <input
                    type="text"
                    id="mobile-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. Imperial Star Destroyer"
                  />
                </div>

                <div>
                  <label htmlFor="mobile-setNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Set Number*
                  </label>
                  <input
                    type="text"
                    id="mobile-setNumber"
                    name="setNumber"
                    required
                    value={formData.setNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g. 75252"
                  />
                </div>

                <div>
                  <label htmlFor="mobile-theme" className="block text-sm font-medium text-gray-700 mb-1">
                    Theme*
                  </label>
                  <select
                    id="mobile-theme"
                    name="theme"
                    required
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="" disabled>
                      Select a theme
                    </option>
                    {themes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobile-year" className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      id="mobile-year"
                      name="year"
                      min="1949"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile-pieces" className="block text-sm font-medium text-gray-700 mb-1">
                      Pieces
                    </label>
                    <input
                      type="number"
                      id="mobile-pieces"
                      name="pieces"
                      min="1"
                      value={formData.pieces}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  onClick={onClose}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md flex items-center justify-center"
                  whileHover={{ backgroundColor: "#10b981" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" />
                      Add Set
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
