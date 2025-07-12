"use client";

import React from "react";

interface User {
  id: string;
  email: string;
  role: "annotator" | "admin";
  name: string;
}

interface UserListProps {
  users: User[];
  onUserUpdated: (user: User) => void;
  onUserDeleted: (userId: string) => void;
}

export default function UserList({ users, onUserUpdated, onUserDeleted }: UserListProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Users</h3>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li key={user.id} className="py-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-sm text-gray-600 capitalize">{user.role}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    const newRole = user.role === "admin" ? "annotator" : "admin";
                    onUserUpdated({ ...user, role: newRole });
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Toggle Role
                </button>
                <button
                  onClick={() => onUserDeleted(user.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
