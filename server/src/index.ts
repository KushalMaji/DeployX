import express from "express";

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to DeployX!");
});

// Status API
app.get("/api/status", (req, res) => {
  res.json({
    status: "DeployX Running",
    version: "1.0.0",
    message: "Backend is working!"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});