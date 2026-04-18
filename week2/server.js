import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(logger);


app.use(express.static(path.join(__dirname, "public")));


app.get("/api", (req, res) => {
  res.send("Week 2");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  // Error handling
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required"
    });
  }

  res.status(200).json({
    success: true,
    message: `Hello, ${name}!`,
    data: {
      name,
      email
    }
  });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `User ${id} profile`
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});