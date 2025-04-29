"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  const waveAnimation = {
    initial: { pathLength: 0, pathOffset: 0 },
    animate: {
      pathLength: 1,
      pathOffset: 0,
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    },
  }

  return (
    <div className="w-full max-w-6xl flex overflow-hidden rounded-xl shadow-2xl">
      {/* Left side - Illustration with wavy background */}
      <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-emerald-400 to-green-500 overflow-hidden">
        {/* Wavy background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute top-[10%] left-[-10%] w-[70%] h-[30%] rounded-full bg-white"
            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-[40%] left-[60%] w-[50%] h-[40%] rounded-full bg-white"
            animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-[70%] left-[20%] w-[40%] h-[40%] rounded-full bg-white"
            animate={{ x: [0, 15, 0], y: [0, -7, 0] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          ></motion.div>
        </motion.div>

        {/* Vector illustration */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[500px] h-[500px] mx-auto my-auto">
  <Image src="/loginform.png" alt="Login Illustration" fill className="object-contain" priority />
</div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-30"
              style={{
                width: Math.random() * 10 + 5 + "px",
                height: Math.random() * 10 + 5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <motion.path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.path>
          </svg>
        </div>
      </div>

      {/* Right side - Login form */}
      <motion.div
        className="w-full md:w-1/2 bg-white p-8 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <motion.div className="flex justify-center mb-8" variants={itemVariants}>
            <div className="relative h-22 w-22">
              <Image src="/logo.webp" alt="Bricker" fill className="object-contain" priority />
            </div>
          </motion.div>

          {/* User avatar */}
          <motion.div className="flex justify-center mb-6" variants={itemVariants}>
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8"
            variants={itemVariants}
          >
            WELCOME
          </motion.h2>

          <form className="space-y-4 md:space-y-6 w-full max-w-sm mx-auto">
            {/* Username field */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:ring-0 bg-transparent text-gray-800 transition-all duration-300 focus:shadow-[0_4px_8px_rgba(52,211,153,0.1)]"
                  placeholder="Username"
                />
              </div>
            </motion.div>

            {/* Password field */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-3 border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:ring-0 bg-transparent text-gray-800 transition-all duration-300 focus:shadow-[0_4px_8px_rgba(52,211,153,0.1)]"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Forgot password */}
            <motion.div className="flex justify-end" variants={itemVariants}>
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </motion.div>

            {/* Login button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-full text-white bg-gradient-to-r from-emerald-400 to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
                whileHover={{
                  scale: 1.03,
                  backgroundImage: "linear-gradient(to left, #34d399, #10b981)",
                  boxShadow: "0 10px 15px -3px rgba(52, 211, 153, 0.2), 0 4px 6px -2px rgba(52, 211, 153, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                LOGIN
              </motion.button>
            </motion.div>

            {/* Register link */}
            <motion.div className="text-center mt-6" variants={itemVariants}>
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
