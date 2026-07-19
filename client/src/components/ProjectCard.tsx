import type { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <div
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

      <button onClick={() => onDelete(project.id)}>
        Delete
      </button>
    </div>
  );
}

export default ProjectCard;