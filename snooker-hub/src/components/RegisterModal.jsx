import React, { useState, useEffect } from 'react'
import SuccessAlert from './SuccessAlert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function RegisterModal ({ tournament, onClose, onRegister }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    slipImage: null
  })
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const bankDetails = {
    accountNumber: '1234 5678 9012 3456',
    iban: 'PK36 SCBL 0000 0011 2345 6702',
    bankName: 'Standard Chartered Bank',
    accountName: 'Snooker Hub By Zain'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      slipImage: e.target.files[0]
    }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowAlert(true)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
    onRegister(formData)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-[#121212] rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Register for {tournament.name}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                <i data-feather="x" className="w-6 h-6"></i>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 mx-2 ${
                  step >= 2 ? 'bg-green-500' : 'bg-gray-700'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  2
                </div>
                <div className={`w-16 h-1 mx-2 ${
                  step >= 3 ? 'bg-green-500' : 'bg-gray-700'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  3
                </div>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                    placeholder="+92 3XX XXXXXXX"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Payment Details</h3>
                
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-2">Entry Fee</h4>
                  <p className="text-2xl font-bold text-green-500">PKR {tournament.fee}</p>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Bank Transfer Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white font-mono">{bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">IBAN:</span>
                      <span className="text-white font-mono text-sm">{bankDetails.iban}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank Name:</span>
                      <span className="text-white">{bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Name:</span>
                      <span className="text-white">{bankDetails.accountName}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <i data-feather="alert-circle" className="text-yellow-500 w-5 h-5 mt-0.5"></i>
                    <p className="text-yellow-400 text-sm">
                      Please transfer the exact amount and upload the payment slip in the next step. 
                      Your registration will be confirmed once the payment is verified.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Continue to Upload
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Upload Payment Slip</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Payment Slip Image
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="slip-upload"
                      required
                    />
                    <label htmlFor="slip-upload" className="cursor-pointer">
                      <i data-feather="upload" className="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                      <p className="text-gray-400 mb-2">
                        {formData.slipImage ? formData.slipImage.name : 'Click to upload payment slip'}
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </label>
                  </div>
                </div>

                {formData.slipImage && (
                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <i data-feather="check-circle" className="text-green-500 w-5 h-5"></i>
                      <p className="text-green-400 text-sm">
                        File selected: {formData.slipImage.name}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Complete Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {showAlert && (
        <SuccessAlert 
          message="Registered successfully!"
          onClose={handleCloseAlert}
        />
      )}
    </>
  )
}