const baseService = require("../services/base.service");

const getBases = async (req, res) => {
  try {
    const bases = await baseService.getBases();
    res.json(bases);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createBase = async (req, res) => {
  try {
    const base = await baseService.createBase(req.body);
    res.status(201).json(base);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getBases,
  createBase,
};