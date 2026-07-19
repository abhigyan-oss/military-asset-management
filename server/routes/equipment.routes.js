const express = require("express");
const router = express.Router();

const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipment.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Create
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createEquipment
);

// Read
router.get("/", authenticate, getAllEquipment);
router.get("/:id", authenticate, getEquipmentById);

// Update
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateEquipment
);

// Delete
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteEquipment
);

module.exports = router;