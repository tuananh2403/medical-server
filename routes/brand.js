const router = require("express").Router();
const ctrls = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBreand);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getBrands);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBrands);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBrand);
module.exports = router;
