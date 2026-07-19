const prisma = require("../utils/prisma");

const createAssignment = async (data) => {
  return prisma.assignment.create({
    data: {
      equipmentId: data.equipmentId,
      assignedTo: data.assignedTo,
      quantity: Number(data.quantity),
    },
    include: {
      equipment: true,
    },
  });
};

const getAssignments = async () => {
  return prisma.assignment.findMany({
    include: {
      equipment: true,
    },
    orderBy: {
      assignmentDate: "desc",
    },
  });
};

module.exports = {
  createAssignment,
  getAssignments,
};