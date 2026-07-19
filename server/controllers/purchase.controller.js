const purchaseService = require("../services/purchase.service");

const createPurchase = async (req, res) => {
  try {
    const purchase = await purchaseService.createPurchase(req.body);
    res.status(201).json(purchase);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await purchaseService.getPurchases();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createPurchase,
  getPurchases,
};