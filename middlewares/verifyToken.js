const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "tuananh", (err, decoded) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "invalid access token",
        });
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "require authentication",
    });
  }
});
const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(401).json({
      success: false,
      mes: " REQUIRE ADMIN ROLE",
    });
  next();
});
module.exports = {
  verifyAccessToken,
  isAdmin,
};
