"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertTriangle, Download, Heart } from "lucide-react"

interface LegoSet {
  id: string
  name: string
  image: string
  setNumber: string
  theme: string
  year: number
  pieces: number
  ownedPieces: number
  parts: {
    id: string
    name: string
    image: string
    color: string
    quantity: number
    owned: boolean
  }[]
}

interface SetDetailModalProps {
  isOpen: boolean
  onClose: () => void
  setId?: string
  data?: LegoSet
}

export default function SetDetailModal({ isOpen, onClose, setId, data }: SetDetailModalProps) {
  const [activeTab, setActiveTab] = useState("info")

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Mock data for preview
  const mockData: LegoSet = data || {
    id: "1",
    name: "LEGO Star Wars Imperial Star Destroyer",
    image: "/placeholder.svg?height=400&width=600",
    setNumber: "75252",
    theme: "Star Wars",
    year: 2019,
    pieces: 4784,
    ownedPieces: 3500,
    parts: [
      {
        id: "p1",
        name: "Plate 1x2",
        image: "/placeholder.svg?height=50&width=50",
        color: "Light Bluish Gray",
        quantity: 24,
        owned: true,
      },
      {
        id: "p2",
        name: "Brick 2x4",
        image: "/placeholder.svg?height=50&width=50",
        color: "Dark Bluish Gray",
        quantity: 36,
        owned: true,
      },
      {
        id: "p3",
        name: "Slope 45° 2x1",
        image: "/placeholder.svg?height=50&width=50",
        color: "White",
        quantity: 18,
        owned: false,
      },
      {
        id: "p4",
        name: "Technic Pin",
        image: "/placeholder.svg?height=50&width=50",
        color: "Black",
        quantity: 42,
        owned: true,
      },
      {
        id: "p5",
        name: "Tile 1x2",
        image: "/placeholder.svg?height=50&width=50",
        color: "Light Bluish Gray",
        quantity: 30,
        owned: false,
      },
    ],
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { opacity: 1, scale: 1.05 },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  if (!isOpen) return null

  const completionPercentage = Math.round((mockData.ownedPieces / mockData.pieces) * 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="relative p-4 border-b">
              <h2 className="text-xl font-bold text-center text-gray-800 pr-8">{mockData.name}</h2>
              <motion.button
                className="absolute right-4 top-4 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Image and basic info */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image src={mockData.image || "/game.jpg"} alt={mockData.name} fill className="object-contain" />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Set Number</p>
                      <p className="font-medium text-gray-800">{mockData.setNumber}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Theme</p>
                      <p className="font-medium text-gray-800">{mockData.theme}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Year Released</p>
                      <p className="font-medium text-gray-800">{mockData.year}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Pieces</p>
                      <p className="font-medium text-gray-800">
                        {mockData.pieces} total ({mockData.ownedPieces} owned)
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Completion</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-emerald-500 h-2.5 rounded-full"
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{completionPercentage}% complete</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <motion.button
                      className="flex-1 py-2 px-4 bg-emerald-500 text-white rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Heart size={18} className="mr-2" />
                      Add to My Sets
                    </motion.button>

                    <motion.button
                      className="py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download size={18} className="mr-2" />
                      Instructions
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 border-b">
                <div className="flex space-x-4">
                  <motion.button
                    className={`py-3 px-4 font-medium border-b-2 ${
                      activeTab === "info" ? "border-emerald-500 text-emerald-600" : "border-transparent text-gray-600"
                    }`}
                    variants={tabVariants}
                    animate={activeTab === "info" ? "active" : "inactive"}
                    onClick={() => setActiveTab("info")}
                  >
                    Information
                  </motion.button>

                  <motion.button
                    className={`py-3 px-4 font-medium border-b-2 ${
                      activeTab === "parts" ? "border-emerald-500 text-emerald-600" : "border-transparent text-gray-600"
                    }`}
                    variants={tabVariants}
                    animate={activeTab === "parts" ? "active" : "inactive"}
                    onClick={() => setActiveTab("parts")}
                  >
                    Parts List
                  </motion.button>
                </div>
              </div>

              {/* Tab content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "info" && (
                    <motion.div key="info" variants={contentVariants} initial="hidden" animate="visible" exit="hidden">
                      <p className="text-gray-700 mb-4">
                        The {mockData.name} is a {mockData.pieces}-piece set from the {mockData.theme} theme released in{" "}
                        {mockData.year}. This impressive model features detailed construction and authentic design
                        elements that make it a standout display piece for any LEGO collection.
                      </p>
                      <p className="text-gray-700 mb-4">
                        You currently own {mockData.ownedPieces} of the {mockData.pieces} pieces needed to complete this
                        set. The parts you're missing are primarily specialized elements and rare colors.
                      </p>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                        <p className="text-amber-800 text-sm">
                          Some parts in this set may be difficult to find. Check the Parts List tab to see which
                          specific pieces you're missing.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "parts" && (
                    <motion.div key="parts" variants={contentVariants} initial="hidden" animate="visible" exit="hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {mockData.parts.map((part) => (
                          <motion.div
                            key={part.id}
                            className={`border rounded-lg p-3 flex items-center ${
                              part.owned ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden mr-3 flex-shrink-0">
                              <Image
                                src={part.image || "/placeholder.svg"}
                                alt={part.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate">{part.name}</p>
                              <p className="text-xs text-gray-600">
                                {part.color} × {part.quantity}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0">
                              {part.owned ? (
                                <Check className="text-emerald-500" size={18} />
                              ) : (
                                <AlertTriangle className="text-red-500" size={18} />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
