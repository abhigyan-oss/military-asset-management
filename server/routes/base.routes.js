const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getBases,
  createBase,
} = require("../controllers/base.controller");

router.get("/", authenticate, getBases);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createBase
);

module.exports = router;