const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

const authenticate = async (req, res, next) => {
  try {
    console.log("METHOD:", req.method);
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Token missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("VERIFY SECRET:", process.env.JWT_SECRET);
    console.log("TOKEN:", token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = authenticate;