import React, { useEffect, useState } from 'react'
import './ContactsPage.css'
import AdminHeader from './AdminHeader'
import Sidebar from './Sidebar'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          'http://localhost:8080/api/contact/all-contacts',
        )
        if (!res.ok) {
          throw new Error('Failed to fetch contacts')
        }
        const data = await res.json()
        setContacts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

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
            <div className="contacts-container">
              <div className="contacts-header">
                <h2>Contact Submissions</h2>
              </div>

              {loading && <p className="loading-text">Loading contacts...</p>}
              {error && <p className="error-text">{error}</p>}

              {!loading && contacts.length === 0 && (
                <p className="no-data">No contacts found.</p>
              )}

              {!loading && contacts.length > 0 && (
                <table className="contacts-table">
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={contact._id}>
                        <td>{index + 1}</td>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone || '-'}</td>
                        <td>{contact.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
