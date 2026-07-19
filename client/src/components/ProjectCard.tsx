import type { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <div className="card">
      <h3>{project.name}</h3>

      <p>
        <strong>Repository:</strong> {project.githubRepo}
      </p>

      <p>
        <strong>Status:</strong> 🟢 {project.status}
      </p>

      <br />

      <button
        className="delete-btn"
        onClick={() => onDelete(project.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ProjectCard;