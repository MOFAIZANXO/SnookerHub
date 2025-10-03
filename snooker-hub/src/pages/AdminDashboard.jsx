import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SuccessAlert from '../components/SuccessAlert'
import ConfirmationAlert from '../components/ConfirmationAlert'
import Logo from '../assets/Logo.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function AdminDashboard () {
  const [activeTab, setActiveTab] = useState('tournaments')
  const [tournaments, setTournaments] = useState([
    { 
      id: 1, 
      name: 'Weekly Amateur Cup', 
      date: 'Every Saturday, 2PM', 
      fee: 1000, 
      registered: 15,
      description: 'Weekly tournament for amateur players',
      image: 'https://images.unsplash.com/photo-1488923566472-4b2d13a4af3b?w=600&auto=format&fit=crop&q=60'
    },
    { 
      id: 2, 
      name: 'Monthly Pro Challenge', 
      date: 'First Sunday, 4PM', 
      fee: 2500, 
      registered: 8,
      description: 'Monthly challenge for professional players',
      image: 'https://images.unsplash.com/photo-1651158752557-7b535a968188?w=600&auto=format&fit=crop&q=60'
    },
    { 
      id: 3, 
      name: 'Annual Championship', 
      date: 'Dec 15-20, 6PM', 
      fee: 5000, 
      registered: 25,
      description: 'Annual championship tournament',
      image: 'https://images.unsplash.com/photo-1730581042361-4c14470a4550?w=600&auto=format&fit=crop&q=60'
    }
  ])

  const [registeredUsers, setRegisteredUsers] = useState([
    { id: 1, name: 'Ahsan Hashmi', email: 'ahsan@example.com', tournament: 'Weekly Amateur Cup', phone: '+92 300 1234567', date: '2024-01-15' },
    { id: 2, name: 'Liam Khan', email: 'liam@example.com', tournament: 'Monthly Pro Challenge', phone: '+92 301 2345678', date: '2024-01-14' },
    { id: 3, name: 'Usama Awan', email: 'usama@example.com', tournament: 'Annual Championship', phone: '+92 302 3456789', date: '2024-01-13' },
    { id: 4, name: 'Ali Raza', email: 'ali@example.com', tournament: 'Weekly Amateur Cup', phone: '+92 303 4567890', date: '2024-01-12' }
  ])

  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    fee: '',
    description: '',
    image: ''
  })

  const [editingTournament, setEditingTournament] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [tournamentToDelete, setTournamentToDelete] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingTournament) {
      setEditingTournament({
        ...editingTournament,
        [name]: value
      })
    } else {
      setNewTournament({
        ...newTournament,
        [name]: value
      })
    }
  }

  const handleAddTournament = (e) => {
    e.preventDefault()
    const tournament = {
      id: tournaments.length + 1,
      name: newTournament.name,
      date: newTournament.date,
      fee: parseInt(newTournament.fee),
      description: newTournament.description,
      image: newTournament.image || 'https://images.unsplash.com/photo-1488923566472-4b2d13a4af3b?w=600&auto=format&fit=crop&q=60',
      registered: 0
    }
    setTournaments([...tournaments, tournament])
    setNewTournament({ name: '', date: '', fee: '', description: '', image: '' })
    setShowModal(false)
    setAlertMessage('Tournament added successfully!')
    setShowSuccessAlert(true)
  }

  const handleUpdateTournament = (e) => {
    e.preventDefault()
    setTournaments(tournaments.map(t => 
      t.id === editingTournament.id ? { ...editingTournament } : t
    ))
    setEditingTournament(null)
    setShowModal(false)
    setAlertMessage('Tournament updated successfully!')
    setShowSuccessAlert(true)
  }

  const handleEditTournament = (tournament) => {
    setEditingTournament(tournament)
    setShowModal(true)
  }

  const handleDeleteTournament = (id) => {
    setTournamentToDelete(id)
    setShowConfirmationAlert(true)
  }

  const confirmDeleteTournament = () => {
    setTournaments(tournaments.filter(t => t.id !== tournamentToDelete))
    setShowConfirmationAlert(false)
    setTournamentToDelete(null)
    setAlertMessage('Tournament deleted successfully!')
    setShowSuccessAlert(true)
  }

  const cancelDelete = () => {
    setShowConfirmationAlert(false)
    setTournamentToDelete(null)
    setUserToDelete(null)
  }

  const handleDeleteUser = (id) => {
    setUserToDelete(id)
    setShowConfirmationAlert(true)
  }

  const confirmDeleteUser = () => {
    setRegisteredUsers(registeredUsers.filter(u => u.id !== userToDelete))
    setShowConfirmationAlert(false)
    setUserToDelete(null)
    setAlertMessage('User removed successfully!')
    setShowSuccessAlert(true)
  }

  const openAddModal = () => {
    setEditingTournament(null)
    setNewTournament({ name: '', date: '', fee: '', description: '', image: '' })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTournament(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
      <nav className="bg-[#121212] shadow-lg py-4 px-6 lg:px-12 fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Snooker Hub Logo" className="w-10 h-10 mr-2 shadow-md" />
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              Snooker <span className="text-green-500">Hub</span> Admin
            </span>
          </div>
          <Link to="/" className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition">
            Back to Site
          </Link>
        </div>
      </nav>

      {showSuccessAlert && (
        <SuccessAlert 
          message={alertMessage}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      {showConfirmationAlert && (
        <ConfirmationAlert 
          title={userToDelete ? "Remove User?" : "Delete Tournament?"}
          message={userToDelete 
            ? "This user will be removed from the registration list." 
            : "This action cannot be undone. The tournament will be permanently deleted."
          }
          confirmText={userToDelete ? "Remove User" : "Delete Tournament"}
          type={userToDelete ? "warning" : "danger"}
          onConfirm={userToDelete ? confirmDeleteUser : confirmDeleteTournament}
          onCancel={cancelDelete}
        />
      )}

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#121212] rounded-2xl shadow-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 flex items-center">
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-full mr-4">
                    <i data-feather="award" className="text-green-500 w-6 h-6"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Tournaments</p>
                    <p className="text-2xl font-bold text-white">{tournaments.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 flex items-center">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                    <i data-feather="users" className="text-blue-500 w-6 h-6"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Registrations</p>
                    <p className="text-2xl font-bold text-white">{registeredUsers.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 flex items-center">
                <div className="flex items-center">
                  <div className="bg-yellow-500/20 p-3 rounded-full mr-4">
                    <i data-feather="dollar-sign" className="text-yellow-500 w-6 h-6"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">
                      PKR {tournaments.reduce((sum, t) => sum + (t.fee * t.registered), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mb-8 border-b border-gray-700">
              <button
                className={`pb-4 px-4 font-semibold ${
                  activeTab === 'tournaments' 
                    ? 'text-green-500 border-b-2 border-green-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('tournaments')}
              >
                Tournaments
              </button>
              <button
                className={`pb-4 px-4 font-semibold ${
                  activeTab === 'users' 
                    ? 'text-green-500 border-b-2 border-green-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('users')}
              >
                Registered Users ({registeredUsers.length})
              </button>
            </div>

            {activeTab === 'tournaments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Manage Tournaments</h2>
                  <button 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
                    onClick={openAddModal}
                  >
                    <i data-feather="plus" className="mr-2 w-4 h-4"></i>
                    Add Tournament
                  </button>
                </div>

                <div className="grid gap-6">
                  {tournaments.map(tournament => (
                    <div key={tournament.id} className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <img 
                              src={tournament.image} 
                              alt={tournament.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                              <p className="text-gray-400">{tournament.date}</p>
                              <p className="text-green-500 font-semibold">Entry Fee: PKR {tournament.fee}</p>
                              <p className="text-blue-400">Registered: {tournament.registered} players</p>
                              {tournament.description && (
                                <p className="text-gray-500 text-sm mt-2">{tournament.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center"
                            onClick={() => handleEditTournament(tournament)}
                          >
                            <i data-feather="edit" className="mr-2 w-4 h-4"></i>
                            Edit
                          </button>
                          <button 
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center"
                            onClick={() => handleDeleteTournament(tournament.id)}
                          >
                            <i data-feather="trash" className="mr-2 w-4 h-4"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Registered Users</h2>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left p-4 text-gray-400 font-semibold">Name</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Email</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Phone</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Tournament</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Date</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registeredUsers.map(user => (
                          <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                            <td className="p-4 text-white">{user.name}</td>
                            <td className="p-4 text-gray-400">{user.email}</td>
                            <td className="p-4 text-gray-400">{user.phone}</td>
                            <td className="p-4 text-gray-400">{user.tournament}</td>
                            <td className="p-4 text-gray-400">{user.date}</td>
                            <td className="p-4">
                              <button 
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">
                  {editingTournament ? 'Edit Tournament' : 'Add New Tournament'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition"
                >
                  <i data-feather="x" className="w-6 h-6"></i>
                </button>
              </div>
            </div>

            <form onSubmit={editingTournament ? handleUpdateTournament : handleAddTournament} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tournament Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Tournament Name"
                    value={editingTournament ? editingTournament.name : newTournament.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                  <input
                    type="text"
                    name="date"
                    placeholder="e.g., Every Saturday, 2PM"
                    value={editingTournament ? editingTournament.date : newTournament.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Entry Fee (PKR)</label>
                  <input
                    type="number"
                    name="fee"
                    placeholder="Entry Fee"
                    value={editingTournament ? editingTournament.fee : newTournament.fee}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    value={editingTournament ? editingTournament.image : newTournament.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Tournament description"
                  value={editingTournament ? editingTournament.description : newTournament.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  {editingTournament ? 'Update Tournament' : 'Add Tournament'}
                </button>
                <button 
                  type="button" 
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}