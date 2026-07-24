import { useEffect, useState } from "react";
import type { Project } from "../types/Project";

interface ProjectFormProps {
  onAddProject: (name: string, githubRepo: string) => void;
  onUpdateProject: (
    id: number,
    name: string,
    githubRepo: string
  ) => void;
  editingProject: Project | null;
}

function ProjectForm({
  onAddProject,
  onUpdateProject,
  editingProject,
}: ProjectFormProps) {
  const [name, setName] = useState("");
  const [githubRepo, setGithubRepo] = useState("");

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setGithubRepo(editingProject.githubRepo);
    } else {
      setName("");
      setGithubRepo("");
    }
  }, [editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !githubRepo) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingProject) {
      onUpdateProject(editingProject.id, name, githubRepo);
    } else {
      onAddProject(name, githubRepo);
    }

    setName("");
    setGithubRepo("");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>
        {editingProject ? "✏️ Edit Project" : "➕ Add New Project"}
      </h2>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="GitHub Repository"
        value={githubRepo}
        onChange={(e) => setGithubRepo(e.target.value)}
      />

      <br />
      <br />

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button className="add-btn" type="submit">
          {editingProject ? "Update Project" : "Add Project"}
        </button>

        {editingProject && (
          <button
            type="button"
            className="delete-btn"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;