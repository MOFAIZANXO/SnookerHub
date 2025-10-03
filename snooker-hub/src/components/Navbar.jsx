import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Navbar () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <nav className="bg-[#121212] shadow-lg py-4 px-6 lg:px-12 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center">
          <img src={Logo} alt="Snooker Hub Logo" className="w-10 h-10 mr-2 shadow-md" />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
            Snooker <span className="text-green-500">Hub</span>
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="font-medium text-gray-300 hover:text-green-500 transition">Home</Link>
          <a href="#about" className="font-medium text-gray-300 hover:text-green-500 transition">About Us</a>
          <a href="#pricing" className="font-medium text-gray-300 hover:text-green-500 transition">Pricing</a>
          <a href="#tournaments" className="font-medium text-gray-300 hover:text-green-500 transition">Tournaments</a>
          <a href="#contact" className="font-medium text-gray-300 hover:text-green-500 transition">Contact</a>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md transition">
            Sign Up
          </Link>
        </div>

        <button 
          id="menu-btn" 
          className="md:hidden text-gray-300 hover:text-green-500 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i data-feather="menu"></i>
        </button>
      </div>

      <div 
        id="mobile-menu" 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#1a1a1a] px-6 py-4 space-y-4`}
      >
        <Link to="/" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <a href="#about" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
        <a href="#pricing" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
        <a href="#tournaments" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Tournaments</a>
        <a href="#contact" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
          <Link to="/login" className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md transition" onClick={() => setIsMobileMenuOpen(false)}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}