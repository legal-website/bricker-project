"use client"

import { motion } from "framer-motion"

interface LoadingStateProps {
  message?: string
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="relative w-16 h-16 mb-4">
        {/* LEGO brick animation */}
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 bg-emerald-500 rounded-sm"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 bg-emerald-400 rounded-sm"
          animate={{
            rotate: [0, -90, -180, -270, -360],
            x: [0, -10, 0, 10, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-6 h-6 bg-green-400 rounded-sm"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            x: [0, 10, 0, -10, 0],
            y: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-sm"
          animate={{
            rotate: [0, -90, -180, -270, -360],
            x: [0, -10, 0, 10, 0],
            y: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
      </div>
      <motion.p
        className="text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {message}
      </motion.p>
    </div>
  )
}
