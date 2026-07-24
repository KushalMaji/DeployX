import type { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  onEdit: (project: Project) => void;
}

function ProjectCard({
  project,
  onDelete,
  onEdit,
}: ProjectCardProps) {
  return (
    <div className="card">
      <h3>{project.name}</h3>

      <p>
        <strong>Repository:</strong>
        <br />
        {project.githubRepo}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            backgroundColor:
              project.status === "Active"
                ? "#4CAF50"
                : "#f44336",
            color: "white",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          {project.status}
        </span>
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          className="add-btn"
          onClick={() => onEdit(project)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(project.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;