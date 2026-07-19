import { useState } from "react";

interface ProjectFormProps {
  onAddProject: (name: string, githubRepo: string) => void;
}

function ProjectForm({ onAddProject }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [githubRepo, setGithubRepo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !githubRepo) {
      alert("Please fill in all fields.");
      return;
    }

    onAddProject(name, githubRepo);

    setName("");
    setGithubRepo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Project</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="GitHub Repository"
          value={githubRepo}
          onChange={(e) => setGithubRepo(e.target.value)}
        />
      </div>

      <button type="submit">Add Project</button>
    </form>
  );
}

export default ProjectForm;