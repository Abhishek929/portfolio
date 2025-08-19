import React, { useState, useEffect } from "react";
import UserForm from './Userform';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("https://portfolio-rosy-five-54.vercel.app/api/user");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://portfolio-rosy-five-54.vercel.app/api/user/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div>
      <UserForm selectedUser={editUser} onSuccess={fetchUsers} />
      <h3>User List</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.firstname} {u.lastname} ({u.email})
            <button onClick={() => setEditUser(u)}>Edit</button>
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
