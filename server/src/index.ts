import express from "express";
import projectRoutes from "./routes/projectRoutes";
import statusRoutes from "./routes/statusRoutes";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to DeployX!");
});

// API Routes
app.use("/api/status", statusRoutes);
app.use("/api/projects", projectRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});