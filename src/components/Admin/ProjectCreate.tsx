"use client";

import React, { useState } from "react";

interface ProjectCreateProps {
  onProjectCreated: () => void;
}

export default function ProjectCreate({ onProjectCreated }: ProjectCreateProps) {
  const [projectName, setProjectName] = useState("");
  const [offlineLabelingAllowed, setOfflineLabelingAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError("Project name is required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          name: projectName.trim(),
          offlineLabelingAllowed,
        }),
      });
      if (res.ok) {
        setProjectName("");
        setOfflineLabelingAllowed(false);
        onProjectCreated();
      } else {
        setError("Failed to create project.");
      }
    } catch (err) {
      setError("Error creating project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-50 p-4 rounded-md shadow-md mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">Create New Project</h3>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="projectName" className="block mb-1 font-medium">
          Project Name
        </label>
        <input
          id="projectName"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <input
          id="offlineLabelingAllowed"
          type="checkbox"
          checked={offlineLabelingAllowed}
          onChange={(e) => setOfflineLabelingAllowed(e.target.checked)}
          disabled={loading}
        />
        <label htmlFor="offlineLabelingAllowed" className="font-medium">
          Allow Offline Labeling
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
