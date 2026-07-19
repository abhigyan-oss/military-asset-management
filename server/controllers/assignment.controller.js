const assignmentService = require("../services/assignment.service");

const createAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignments();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
};