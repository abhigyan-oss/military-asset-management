const purchaseRoutes = require("./routes/purchase.routes");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const transferRoutes = require("./routes/transfer.routes");
const baseRoutes = require("./routes/base.routes");
const assignmentRoutes = require("./routes/assignment.routes");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const equipmentRoutes = require("./routes/equipment.routes"); // <-- Add this

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Military Asset Management API Running 🚀",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/equipment", equipmentRoutes); // <-- Add this
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/bases", baseRoutes);
app.use("/api/assignments", assignmentRoutes);

module.exports = app;