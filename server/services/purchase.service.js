const prisma = require("../utils/prisma");

const createPurchase = async (data) => {
  return prisma.purchase.create({
    data: {
      equipmentId: data.equipmentId,
      quantity: Number(data.quantity),
      supplier: data.supplier,
    },
    include: {
      equipment: true,
    },
  });
};

const getPurchases = async () => {
  return prisma.purchase.findMany({
    include: {
      equipment: true,
    },
    orderBy: {
      purchaseDate: "desc",
    },
  });
};

module.exports = {
  createPurchase,
  getPurchases,
};