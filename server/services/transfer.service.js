const prisma = require("../utils/prisma");

const createTransfer = async (data) => {
  return prisma.transfer.create({
    data: {
      equipmentId: data.equipmentId,
      fromBaseId: data.fromBaseId,
      toBaseId: data.toBaseId,
      quantity: Number(data.quantity),
    },
    include: {
      equipment: true,
      fromBase: true,
      toBase: true,
    },
  });
};

const getTransfers = async () => {
  return prisma.transfer.findMany({
    include: {
      equipment: true,
      fromBase: true,
      toBase: true,
    },
    orderBy: {
      transferDate: "desc",
    },
  });
};

module.exports = {
  createTransfer,
  getTransfers,
};