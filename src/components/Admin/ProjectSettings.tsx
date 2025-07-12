update"use client";

import React, { useState, useEffect } from "react";

interface ProjectSettingsProps {
  projectId: string;
  projectName: string;
  offlineLabelingAllowed: boolean;
  archived: boolean;
  exported: boolean;
  dataCount: number;
  onToggleOfflineLabeling: (allowed: boolean) => void;
  onToggleArchive: (archived: boolean) => void;
  onDeleteProject: () => void;
  onRenameProject: (newName: string) => void;
}

export default function ProjectSettings({
  projectId,
  projectName,
  offlineLabelingAllowed,
  archived,
  exported,
  dataCount,
  onToggleOfflineLabeling,
  onToggleArchive,
  onDeleteProject,
  onRenameProject,
}: ProjectSettingsProps) {
  const [allowed, setAllowed] = useState(offlineLabelingAllowed);
  const [isArchived, setIsArchived] = useState(archived);
  const [name, setName] = useState(projectName);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    setAllowed(offlineLabelingAllowed);
  }, [offlineLabelingAllowed]);

  useEffect(() => {
    setIsArchived(archived);
  }, [archived]);

  useEffect(() => {
    setName(projectName);
  }, [projectName]);

  const handleToggleAllowed = () => {
    const newValue = !allowed;
    setAllowed(newValue);
    onToggleOfflineLabeling(newValue);
  };

  const handleToggleArchived = () => {
    const newValue = !isArchived;
    setIsArchived(newValue);
    onToggleArchive(newValue);
  };

  useEffect(() => {
    setIsArchived(archived);
  }, [archived]);

  const handleDelete = () => {
    if (dataCount > 0 && !exported) {
      alert("Cannot delete project with data that is not exported.");
      return;
    }
    if (confirm("Are you sure you want to delete this project?")) {
      onDeleteProject();
    }
  };

  const handleRename = () => {
    if (name.trim() === "") {
      alert("Project name cannot be empty.");
      return;
    }
    onRenameProject(name.trim());
    setEditingName(false);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md max-w-md mx-auto">
      <div className="mb-4">
        {editingName ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <button
              onClick={handleRename}
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-900 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditingName(false)}
              className="ml-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditingName(true)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Rename
            </button>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="offlineLabeling" className="font-medium">
          Allow Offline Labeling
        </label>
        <button
          onClick={handleToggleAllowed}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            allowed ? "bg-black" : "bg-gray-300"
          }`}
          aria-pressed={allowed}
          aria-label="Toggle offline labeling"
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              allowed ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="archiveProject" className="font-medium">
          Archive Project
        </label>
        <button
          onClick={handleToggleArchived}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isArchived ? "bg-black" : "bg-gray-300"
          }`}
          aria-pressed={isArchived}
          aria-label="Toggle archive project"
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              isArchived ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
}
