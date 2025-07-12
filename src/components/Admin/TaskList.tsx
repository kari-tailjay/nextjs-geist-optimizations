"use client";

import React from "react";

interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  assignedTo: string[]; // user ids
  status: "pending" | "in_progress" | "completed" | "review";
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {tasks.map((task) => (
            <li key={task.id} className="py-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{task.name}</div>
                <div className="text-sm text-gray-600">{task.description}</div>
                <div className="text-sm text-gray-600">Status: {task.status}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    const newStatus =
                      task.status === "pending"
                        ? "in_progress"
                        : task.status === "in_progress"
                        ? "completed"
                        : "pending";
                    onTaskUpdated({ ...task, status: newStatus });
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => onTaskDeleted(task.id)}
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
