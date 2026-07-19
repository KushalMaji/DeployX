import { Request, Response } from "express";
import { Project } from "../types/Project";

// Temporary in-memory storage
const projects: Project[] = [];

/**
 * GET /api/projects
 * Get all projects
 */
export const getProjects = (req: Request, res: Response) => {
  res.json(projects);
};

/**
 * GET /api/projects/:id
 * Get a single project by ID
 */
export const getProjectById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.json(project);
};

/**
 * POST /api/projects
 * Create a new project
 */
export const createProject = (req: Request, res: Response) => {
  const { name, githubRepo } = req.body;

  // Basic validation
  if (!name || !githubRepo) {
    return res.status(400).json({
      message: "Name and GitHub repository are required.",
    });
  }

  const newProject: Project = {
    id: projects.length + 1,
    name,
    githubRepo,
    status: "Active",
  };

  projects.push(newProject);

  res.status(201).json(newProject);
};

/**
 * PUT /api/projects/:id
 * Update an existing project
 */
export const updateProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const { name, githubRepo, status } = req.body;

  if (name) project.name = name;
  if (githubRepo) project.githubRepo = githubRepo;
  if (status) project.status = status;

  res.json(project);
};

/**
 * DELETE /api/projects/:id
 * Delete a project
 */
export const deleteProject = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  projects.splice(index, 1);

  res.json({
    message: "Project deleted successfully.",
  });
};