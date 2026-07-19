import { useEffect, useState } from "react";
import api from "../api/api";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch all projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Add a new project
  const addProject = async (name: string, githubRepo: string) => {
    try {
      await api.post("/projects", {
        name,
        githubRepo,
      });

      // Refresh the project list
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Load projects when the page opens
  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id: number) => {
  try {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  } catch (error) {
    console.error("Error deleting project:", error);
  }
  };

  return (
    <div>
      <h1>🚀 DeployX Dashboard</h1>

      <ProjectForm onAddProject={addProject} />

      <hr />

      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
      onDelete={deleteProject}
    />
      ))
      )}
    </div>
  );
}

export default Dashboard;