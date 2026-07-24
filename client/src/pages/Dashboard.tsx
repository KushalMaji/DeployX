import { useEffect, useState } from "react";
import api from "../api/api";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");

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

  // Update project
  const updateProject = async (
    id: number,
    name: string,
    githubRepo: string
  ) => {
    try {
      await api.put(`/projects/${id}`, {
        name,
        githubRepo,
      });

      fetchProjects();
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Delete project
  const deleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);

      fetchProjects();

      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  // Load projects
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h1>🚀 DeployX Dashboard</h1>

      {/* Statistics */}
      <div className="stats-container">
        <StatsCard
          title="Total Projects"
          value={projects.length}
        />

        <StatsCard
          title="Active Projects"
          value={
            projects.filter(
              (project) => project.status === "Active"
            ).length
          }
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search Projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {/* Add / Edit Form */}
      <ProjectForm
        onAddProject={addProject}
        onUpdateProject={updateProject}
        editingProject={editingProject}
      />

      <h2 style={{ marginBottom: "20px" }}>
        Projects ({filteredProjects.length})
      </h2>

      {filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={deleteProject}
            onEdit={setEditingProject}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;