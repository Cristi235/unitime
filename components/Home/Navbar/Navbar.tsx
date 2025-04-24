import { navLinks } from '@/constant/constant'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md fixed top-0 left-0 right-0 z-[1000] transition-all duration-300">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white text-2xl font-semibold">UT</span>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wider">UniTime</h1>
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={link.url}>
                <p className="relative text-lg font-medium hover:text-indigo-300 transition-all duration-200">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-300 scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white hover:text-indigo-300"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden absolute top-[12vh] left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-6 px-4 shadow-lg"
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link href={link.url} key={link.id}>
                <p className="text-xl font-medium hover:text-indigo-300 transition-all duration-200">
                  {link.label}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Navbar
