"use client";

import React, { useState, useEffect } from "react";
import ProjectSettings from "./ProjectSettings";
import ProjectList from "./ProjectList";
import ProjectCreate from "./ProjectCreate";

interface Project {
  id: string;
  name: string;
  offlineLabelingAllowed: boolean;
  archived: boolean;
  exported: boolean;
  dataCount: number;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleToggleOfflineLabeling = async (projectId: string, allowed: boolean) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, offlineLabelingAllowed: allowed } : project
    );
    setProjects(updatedProjects);

    try {
      const projectToUpdate = updatedProjects.find((p) => p.id === projectId);
      if (projectToUpdate) {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectToUpdate),
        });
        if (res.ok) {
          alert("Offline labeling setting updated.");
        } else {
          console.error("Failed to update project");
        }
      }
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleToggleArchive = async (projectId: string, archived: boolean) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, archived } : project
    );
    setProjects(updatedProjects);

    try {
      const projectToUpdate = updatedProjects.find((p) => p.id === projectId);
      if (projectToUpdate) {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectToUpdate),
        });
        if (res.ok) {
          alert(`Project ${archived ? "archived" : "activated"} successfully.`);
        } else {
          console.error("Failed to update project archive status");
        }
      }
    } catch (err) {
      console.error("Error updating project archive status:", err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: projectId }),
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== projectId));
        setSelectedProject(null);
        alert("Project deleted successfully.");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete project.");
      }
    } catch (err) {
      alert("Error deleting project: " + err);
    }
  };

  const handleRenameProject = async (projectId: string, newName: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, name: newName } : project
    );
    setProjects(updatedProjects);

    try {
      const projectToUpdate = updatedProjects.find((p) => p.id === projectId);
      if (projectToUpdate) {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectToUpdate),
        });
        if (res.ok) {
          alert("Project renamed successfully.");
        } else {
          console.error("Failed to update project name");
        }
      }
    } catch (err) {
      console.error("Error updating project name:", err);
    }
  };

  const handleProjectCreated = () => {
    setLoading(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="p-6 max-w-4xl mx-auto">Loading projects...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ProjectCreate onProjectCreated={handleProjectCreated} />
      <h3 className="text-xl font-semibold mb-4">Active Projects</h3>
      <ProjectList
        projects={projects.filter((p) => !p.archived)}
        onProjectUpdated={(project) => {
          setSelectedProject(project);
        }}
      />
      <h3 className="text-xl font-semibold mt-8 mb-4">Archived Projects</h3>
      <ProjectList
        projects={projects.filter((p) => p.archived)}
        onProjectUpdated={(project) => {
          setSelectedProject(project);
        }}
      />
      {selectedProject && (
        <div className="mt-6">
          <ProjectSettings
            projectId={selectedProject.id}
            projectName={selectedProject.name}
            offlineLabelingAllowed={selectedProject.offlineLabelingAllowed}
            archived={selectedProject.archived}
            exported={selectedProject.exported}
            dataCount={selectedProject.dataCount}
            onToggleOfflineLabeling={(allowed) =>
              handleToggleOfflineLabeling(selectedProject.id, allowed)
            }
            onToggleArchive={(archived) =>
              handleToggleArchive(selectedProject.id, archived)
            }
            onDeleteProject={() => {
              if (!selectedProject.archived) {
                alert("Cannot delete active project. Please archive it first.");
                return;
              }
              handleDeleteProject(selectedProject.id);
            }}
            onRenameProject={(newName) => {
              handleRenameProject(selectedProject.id, newName);
            }}
          />
        </div>
      )}
    </div>
  );
}
