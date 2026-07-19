import { useEffect, useState } from "react";
import api from "../api/api";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";

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
          <div
            key={project.id}
            style={{
              backgroundColor: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{project.name}</h3>

            <p>
              <strong>Repository:</strong> {project.githubRepo}
            </p>

            <p>
              <strong>Status:</strong> {project.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;