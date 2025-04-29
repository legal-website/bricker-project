"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trash2, Info, Heart } from "lucide-react"

interface SetCardProps {
  id: string
  name: string
  image: string
  pieces?: number
  theme?: string
  year?: number
  matchPercentage?: number
  onRemove?: (id: string) => void
  onView?: (id: string) => void
  onAdd?: (id: string) => void
  isOwned?: boolean
}

export default function SetCard({
  id,
  name,
  image,
  pieces,
  theme,
  year,
  matchPercentage,
  onRemove,
  onView,
  onAdd,
  isOwned = false,
}: SetCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/game.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Match percentage indicator (for explore page) */}
        {matchPercentage !== undefined && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E6E6E6"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={matchPercentage > 70 ? "#10b981" : matchPercentage > 40 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="3"
                  strokeDasharray={`${matchPercentage}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">
                  {matchPercentage}%
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 h-12">{name}</h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          {pieces && <span>{pieces} pieces</span>}
          {theme && <span>{theme}</span>}
          {year && <span>{year}</span>}
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center mt-2">
          <motion.button
            className="p-2 rounded-full text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onView && onView(id)}
          >
            <Info size={18} />
          </motion.button>

          {isOwned ? (
            <motion.button
              className="p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove && onRemove(id)}
            >
              <Trash2 size={18} />
            </motion.button>
          ) : (
            <motion.button
              className="p-2 rounded-full text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAdd && onAdd(id)}
            >
              <Heart size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
