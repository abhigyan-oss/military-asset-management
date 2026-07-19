const equipmentService = require("../services/equipment.service");

const createEquipment = async (req, res) => {
  try {
    const equipment = await equipmentService.createEquipment(req.body);
    return res.status(201).json(equipment);
  } catch (error) {
    console.error("ERROR:", error);   // <-- Add this

    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await equipmentService.getAllEquipment();
    return res.status(200).json(equipment);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const equipment = await equipmentService.getEquipmentById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    return res.status(200).json(equipment);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const equipment = await equipmentService.updateEquipment(
      req.params.id,
      req.body
    );

    return res.status(200).json(equipment);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    await equipmentService.deleteEquipment(req.params.id);

    return res.status(200).json({
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};