"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut, Search, Package } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("/my-sets")

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  }

  const navLinks = [
    { href: "/my-sets", label: "My Sets", icon: <Package className="h-5 w-5" /> },
    { href: "/explore", label: "Explore", icon: <Search className="h-5 w-5" /> },
    { href: "/", label: "Logout", icon: <LogOut className="h-5 w-5" /> },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/my-sets" className="flex items-center">
          <div className="relative h-20 w-auto sm:h-22 sm:w-auto md:h-[80px] md:w-auto">
              <Image src="/logo.webp" alt="Bricker" fill className="object-cover" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center text-gray-700 hover:text-emerald-500 transition-colors duration-200 ${
                  activeLink === link.href ? "text-emerald-500" : ""
                }`}
                onClick={() => setActiveLink(link.href)}
              >
                <span className="flex items-center">
                  {link.icon}
                  <span className="ml-1">{link.label}</span>
                </span>
                {activeLink === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500"
                    layoutId="activeNavIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center">
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="ml-4 p-1 rounded-md text-gray-700 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[60px] bg-white z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex flex-col space-y-4 mt-4">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={menuItemVariants}>
                    <Link
                      href={link.href}
                      className={`flex items-center p-3 rounded-lg ${
                        activeLink === link.href ? "bg-emerald-50 text-emerald-500" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setActiveLink(link.href)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
