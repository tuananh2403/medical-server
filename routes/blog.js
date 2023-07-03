const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/blog");
const uploader = require("../config/cloundinary.config");
router.get("/", ctrls.getBlogs);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get("/one/:bid", verifyAccessToken, ctrls.getBlog);
router.put("/like/:bid", verifyAccessToken, ctrls.likeBlog);
router.put("/dislike/:bid", verifyAccessToken, ctrls.disLikeBlog);

router.put(
  "/uploadimageblog/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImagesBlog
);

router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);
module.exports = router;
