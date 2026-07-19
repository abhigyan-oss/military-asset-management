const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  createTransfer,
  getTransfers,
} = require("../controllers/transfer.controller");

router.get(
  "/",
  authenticate,
  getTransfers
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "LOGISTICS_OFFICER"),
  createTransfer
);

module.exports = router;