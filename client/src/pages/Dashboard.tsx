import { useEffect, useState } from "react";
import api from "../api/api";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch all projects
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

      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Delete a project
  const deleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);

      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Load projects when page opens
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h1>🚀 DeployX Dashboard</h1>
      <div className="stats-container">
      <StatsCard
        title="Total Projects"
        value={projects.length}
      />

      <StatsCard
        title="Active Projects"
        value={projects.filter((p) => p.status === "Active").length}
      />
    </div>
    
      <ProjectForm onAddProject={addProject} />

      <h2 style={{ marginBottom: "20px" }}>
        Projects ({projects.length})
      </h2>

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