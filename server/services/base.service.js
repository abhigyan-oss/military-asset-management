const prisma = require("../utils/prisma");

const getBases = async () => {
  return prisma.base.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const createBase = async (data) => {
  return prisma.base.create({
    data,
  });
};

module.exports = {
  getBases,
  createBase,
};