"use client"

import { motion } from "framer-motion"

interface EnhancedLoadingProps {
  message?: string
}

export default function EnhancedLoading({ message = "Loading your LEGO sets..." }: EnhancedLoadingProps) {
  // LEGO brick colors
  const colors = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEGO logo animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Animated LEGO bricks */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-sm relative"
                style={{ backgroundColor: colors[i % colors.length] }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                {/* LEGO studs */}
                <div className="absolute top-1 left-1 w-4 h-4 bg-white/20 rounded-full"></div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-black/10 rounded-full"
          animate={{
            width: ["60%", "70%", "60%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">Building Your Collection</h3>
        <p className="text-gray-600">{message}</p>
      </motion.div>

      {/* Loading progress bar */}
      <motion.div
        className="w-64 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
          animate={{
            width: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}
