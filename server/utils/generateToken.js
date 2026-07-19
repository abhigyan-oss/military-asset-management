const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    console.log("SIGN SECRET:", process.env.JWT_SECRET);
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      baseId: user.baseId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;