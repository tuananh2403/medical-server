const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) =>
  jwt.sign(
    {
      _id: uid,
      role,
    },
    "tuananh",
    { expiresIn: "3d" }
  );
const generateRefreshToken = (uid) =>
  jwt.sign(
    {
      _id: uid,
    },
    "tuananh",
    { expiresIn: "7d" }
  );
module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
