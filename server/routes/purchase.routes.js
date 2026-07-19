const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  createPurchase,
  getPurchases,
} = require("../controllers/purchase.controller");

router.get(
  "/",
  authenticate,
  getPurchases
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "LOGISTICS_OFFICER"),
  createPurchase
);

module.exports = router;