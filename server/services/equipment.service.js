const prisma = require("../utils/prisma");

const createEquipment = async (data) => {
  return await prisma.equipment.create({
    data,
  });
};

const getAllEquipment = async () => {
  return await prisma.equipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getEquipmentById = async (id) => {
  return await prisma.equipment.findUnique({
    where: {
      id,
    },
  });
};

const updateEquipment = async (id, data) => {
  return await prisma.equipment.update({
    where: {
      id,
    },
    data,
  });
};

const deleteEquipment = async (id) => {
  return await prisma.equipment.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};