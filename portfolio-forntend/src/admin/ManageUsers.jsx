import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ManageUsers.css'
import AdminHeader from './AdminHeader'
import Sidebar from './Sidebar'
import UserDefaultImage from '../assets/profile.png'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])
  
  const API_BASE = "https://portfolio-backend-olive-five.vercel.app";
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/get-users`)
      if (!res.ok) throw new Error('Failed to fetch users')
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      const res = await fetch(
        `${API_BASE}/api/auth/delete-user/${id}`,
        {
          method: 'DELETE',
        },
      )
      if (!res.ok) throw new Error('Failed to delete user')
      alert('User deleted successfully')
      fetchUsers()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`)
  }

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className="sidebar-container">
          <Sidebar />
        </div>

        {/* Main area */}
        <div className="admin-main">
          <AdminHeader />
          <div className="admin-content">
            <div className="users-container">
              <div className="users-header">
                <h2>Users List</h2>
              </div>

              {/* Search bar */}
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by username or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {loading && <p className="loading-text">Loading users...</p>}
              {error && <p className="error-text">{error}</p>}

              {!loading && filteredUsers.length === 0 && (
                <p className="no-data">No matching users found.</p>
              )}

              {!loading && filteredUsers.length > 0 && (
                <div className="users-list">
                  {filteredUsers.map((user) => (
                    <div className="user-card" key={user._id}>
                      {/* User Avatar */}
                      <img
                        src={user.image || UserDefaultImage }
                        alt={user.username}
                        className="user-avatar"
                      />

                      {/* User Info */}
                      <div className="user-info">
                        <h3 className="user-name">
                          {user.username}{' '}
                          <span className="user-location">
                            {user.location || ''}
                          </span>
                        </h3>                        
                        <p className="user-email">
                          <a
                            href={`mailto:${user.email}`}
                            className="user-email"
                          >
                            {user.email}
                          </a>
                        </p>
                        <p className="user-role">
                          Role: {user.role }
                        </p>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(user._id)}
                        >
                          ✏ Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(user._id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
