import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import Sidebar from './Sidebar'
import './EditUser.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUser()
  }, [id])

  const fetchUser = async () => {
    try {
      const res = await fetch(`https://portfolio-api-eight-green.vercel.app/api/auth/get-user/${id}`)
      if (!res.ok) throw new Error('Failed to fetch user data')
      const data = await res.json()
      setFormData({
        username: data.username,
        email: data.email,
        role: data.role,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(
        `https://portfolio-api-eight-green.vercel.app/api/auth/update-user/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      )
      if (!res.ok) throw new Error('Failed to update user')
      toast.success("User updated successfully", { position: "top-right" });
      setTimeout(() => {
        navigate('/admin/manage-users')
      }, 1500);
    } catch (err) {
      setError(err.message)
    }
  }

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
            <ToastContainer />
            <div className="edit-user-container">
              <h2>Edit User</h2>
              {loading && <p>Loading user data...</p>}
              {error && <p className="error-text">{error}</p>}

              {!loading && (
                <form className="edit-user-form" onSubmit={handleSubmit}>
                  <label>Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} required/>
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <button type="submit" className="save-btn"> Update </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
