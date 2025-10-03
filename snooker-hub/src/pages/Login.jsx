import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthNavbar from '../components/AuthNavbar'
import CustomAlert from '../components/CustomAlert'

export default function Login () {
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type })
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    showAlert('Logged in successfully!', 'success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
      <AuthNavbar />
      
      {alert.show && (
        <CustomAlert 
          message={alert.message} 
          type={alert.type}
          onClose={handleCloseAlert}
        />
      )}

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto bg-[#121212] rounded-2xl shadow-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your Snooker Hub account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-green-500 hover:text-green-400 text-sm font-semibold">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-500 hover:text-green-400 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}