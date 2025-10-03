import React, { useState, useEffect } from 'react'
import RegisterModal from './RegisterModal'
import AllTournamentsModal from './AllTournamentsModal'
import CustomAlert from './CustomAlert'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Tournaments () {
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showAllTournamentsModal, setShowAllTournamentsModal] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const tournaments = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1488923566472-4b2d13a4af3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25vb2tlcnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Weekly Amateur Cup",
      date: "Every Saturday, 2PM",
      fee: 1000
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1651158752557-7b535a968188?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
      title: "Monthly Pro Challenge",
      date: "First Sunday, 4PM",
      fee: 2500
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1730581042361-4c14470a4550?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
      title: "Annual Championship",
      date: "Dec 15-20, 6PM",
      fee: 5000
    }
  ]

  const handleRegisterClick = (tournament) => {
    setSelectedTournament(tournament)
    setShowRegisterModal(true)
  }

  const handleRegistrationComplete = (formData) => {
    showAlert('Registered successfully!', 'success')
  }

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type })
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false })
  }

  return (
    <>
      <section id="tournaments" className="py-20 px-6 lg:px-12 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            Upcoming <span className="text-[#03C05D]">Tournaments</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament, index) => (
              <div 
                key={tournament.id}
                className="bg-[#121212] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition" 
                data-aos="fade-up" 
                data-aos-delay={(index + 1) * 100}
              >
                <img 
                  src={tournament.image} 
                  alt={tournament.title}
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tournament.title}</h3>
                  <div className="flex items-center text-gray-400 mb-3">
                    <i data-feather="calendar" className="mr-2"></i>
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400 mb-6">
                    <i data-feather="dollar-sign" className="mr-2"></i>
                    <span>Entry Fee: PKR {tournament.fee}</span>
                  </div>
                  <button 
                    onClick={() => handleRegisterClick(tournament)}
                    className="w-full py-2 rounded-lg font-semibold bg-[#03C05D] text-white hover:bg-green-700 transition"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAllTournamentsModal(true)}
              className="px-6 py-3 rounded-full font-semibold border border-[#03C05D] text-[#03C05D] hover:bg-[#03C05D] hover:text-white transition"
            >
              View All Tournaments
            </button>
          </div>
        </div>
      </section>

      {showRegisterModal && selectedTournament && (
        <RegisterModal 
          tournament={selectedTournament}
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegistrationComplete}
        />
      )}

      {showAllTournamentsModal && (
        <AllTournamentsModal 
          tournaments={tournaments}
          onClose={() => setShowAllTournamentsModal(false)}
          onRegister={handleRegisterClick}
        />
      )}

      {alert.show && (
        <CustomAlert 
          message={alert.message} 
          type={alert.type}
          onClose={handleCloseAlert}
        />
      )}
    </>
  )
}