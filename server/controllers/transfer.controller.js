const transferService = require("../services/transfer.service");

const createTransfer = async (req, res) => {
  try {
    const transfer = await transferService.createTransfer(req.body);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getTransfers = async (req, res) => {
  try {
    const transfers = await transferService.getTransfers();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createTransfer,
  getTransfers,
};