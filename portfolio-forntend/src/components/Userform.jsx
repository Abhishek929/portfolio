import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';

const UserForm = ({ selectedUser, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        firstname: selectedUser.firstname || "",
        lastname: selectedUser.lastname || "",
        email: selectedUser.email || ""
      });
    } else {
      setFormData({ firstname: "", lastname: "", email: "" });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let url = "http://localhost:8080/api/user";
    let method = "POST";

    if (selectedUser?._id) {
      url = `http://localhost:8080/api/user/${selectedUser._id}`;
      method = "PATCH"; // Use "PATCH" instead of "patch";
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    console.log(formData);
    

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (res.ok) {
      alert(selectedUser ? "User updated!" : "User created!");
      onSuccess && onSuccess();
      setFormData({ firstname: "", lastname: "", email: "" });
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Error in fetch:", err);
    alert("Server error");
  }
};


  return (
    <div>
      <Navbar/>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">
          {selectedUser ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
