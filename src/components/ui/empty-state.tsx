"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface EmptyStateProps {
  title: string
  message: string
  icon?: ReactNode
  action?: ReactNode
  image?: string
}

export default function EmptyState({ title, message, icon, action, image }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-8 my-8 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {image && (
        <div className="relative w-48 h-48 mb-6">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
        </div>
      )}

      {icon && <div className="text-emerald-500 mb-4">{icon}</div>}

      <motion.h3
        className="text-xl font-bold text-gray-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {message}
      </motion.p>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}
