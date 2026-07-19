import { Request, Response } from "express";
import { Project } from "../types/Project";

const projects: Project[] = [];

export const getProjects = (req: Request, res: Response) => {
  res.json(projects);
};

export const createProject = (req: Request, res: Response) => {
  const { name, githubRepo } = req.body;

  const newProject: Project = {
    id: projects.length + 1,
    name,
    githubRepo,
    status: "Active",
  };

  projects.push(newProject);

  res.status(201).json(newProject);
};