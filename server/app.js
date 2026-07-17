const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Military Asset Management API is running 🚀",
  });
});

module.exports = app;