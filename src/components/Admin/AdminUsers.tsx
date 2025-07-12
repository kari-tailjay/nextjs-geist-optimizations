"use client";

import React, { useState, useEffect } from "react";
import UserList from "./UserList";

interface User {
  id: string;
  email: string;
  role: "annotator" | "admin";
  name: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  const handleUserUpdated = async (updatedUser: User) => {
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      alert("Error updating user: " + err);
    }
  };

  const handleUserDeleted = async (userId: string) => {
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      alert("Error deleting user: " + err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <UserList users={users} onUserUpdated={handleUserUpdated} onUserDeleted={handleUserDeleted} />
    </div>
  );
}
