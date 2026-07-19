const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  createAssignment,
  getAssignments,
} = require("../controllers/assignment.controller");

router.get(
  "/",
  authenticate,
  getAssignments
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "BASE_COMMANDER"),
  createAssignment
);

module.exports = router;