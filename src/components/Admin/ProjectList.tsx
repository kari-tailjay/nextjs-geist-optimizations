"use client";

import React, { useState } from "react";
import ProjectSettings from "./ProjectSettings";

interface Project {
  id: string;
  name: string;
  offlineLabelingAllowed: boolean;
  archived: boolean;
  exported: boolean;
  dataCount: number;
}

interface ProjectListProps {
  projects: Project[];
  onProjectUpdated: (updatedProject: Project) => void;
}

export default function ProjectList({ projects, onProjectUpdated }: ProjectListProps) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const toggleAccordion = (projectId: string) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Projects</h3>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {projects.map((project) => (
            <li key={project.id} className="py-2">
              <button
                onClick={() => toggleAccordion(project.id)}
                className="w-full text-left flex justify-between items-center px-2 py-1 hover:bg-gray-200 rounded"
              >
                <span className="font-medium">{project.name}</span>
                <span className="text-sm text-gray-600">
                  {project.archived ? "Archived" : "Active"}
                </span>
              </button>
              {openProjectId === project.id && (
                <div className="mt-2">
                  <ProjectSettings
                    projectId={project.id}
                    projectName={project.name}
                    offlineLabelingAllowed={project.offlineLabelingAllowed}
                    archived={project.archived}
                    exported={project.exported}
                    dataCount={project.dataCount}
                    onToggleOfflineLabeling={(allowed) =>
                      onProjectUpdated({ ...project, offlineLabelingAllowed: allowed })
                    }
                    onToggleArchive={(archived) =>
                      onProjectUpdated({ ...project, archived })
                    }
                    onDeleteProject={() => {
                      // Deletion handled in parent component
                      onProjectUpdated({ ...project, archived: true }); // Example action
                    }}
                    onRenameProject={(newName) =>
                      onProjectUpdated({ ...project, name: newName })
                    }
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
