import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "DeployX Running",
    version: "1.0.0",
    message: "Backend is working!",
  });
});

export default router;