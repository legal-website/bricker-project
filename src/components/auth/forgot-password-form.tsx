"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate email sending
    setEmailSent(true)
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
          <div className="relative w-[413px] h-[370px] mx-auto my-auto">
            <Image src="/forget.png" alt="Forgot Password Illustration" fill className="object-cover" priority />
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

      {/* Right side - Forgot Password form */}
      <motion.div
        className="w-full md:w-1/2 bg-white p-8 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <motion.div className="flex justify-center mb-8" variants={itemVariants}>
          <div className="flex justify-start">
  <Image
    src="/logo.webp"
    alt="Bricker"
    height={50}
    width={0}
    style={{ height: "50px", width: "auto" }}
    priority
  />
</div>
          </motion.div>

          <motion.div className="mb-8" variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-3xl font-bold text-center text-gray-800 mb-3 md:mb-4"
            variants={itemVariants}
          >
            Forgot Password
          </motion.h2>

          <motion.p className="text-center text-gray-600 mb-8" variants={itemVariants}>
            {emailSent
              ? "Check your email for a reset link"
              : "Enter your email address and we'll send you a link to reset your password."}
          </motion.p>

          {!emailSent ? (
            <form className="space-y-4 md:space-y-6 w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
              {/* Email field */}
              <motion.div className="space-y-2" variants={itemVariants}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-emerald-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:ring-0 bg-transparent text-gray-800 transition-all duration-300 focus:shadow-[0_4px_8px_rgba(52,211,153,0.1)]"
                    placeholder="Email Address"
                  />
                </div>
              </motion.div>

              {/* Submit button */}
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
                  SEND RESET LINK
                </motion.button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Email Sent!</h3>
              <p className="text-gray-600 mb-4">
                We've sent a password reset link to your email address. Please check your inbox.
              </p>
              <button
                onClick={() => setEmailSent(false)}
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
              >
                Didn't receive the email? Try again
              </button>
            </motion.div>
          )}

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
        </div>
      </motion.div>
    </div>
  )
}
