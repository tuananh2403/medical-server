const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const responsive = await BlogCategory.create(req.body);
  return res.status(200).json({
    success: responsive ? true : false,
    crearedCategory: responsive
      ? responsive
      : "cannot create new Blog category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const responsive = await BlogCategory.find().select("title");
  return res.status(200).json({
    success: responsive ? true : false,
    BlogCategories: responsive ? responsive : "cannot get  Blog category",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const responsive = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: responsive ? true : false,
    updatedCategory: responsive ? responsive : "cannot update Blog category",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const responsive = await BlogCategory.findByIdAndDelete(bcid);
  return res.status(200).json({
    success: responsive ? true : false,
    deletedCategory: responsive ? responsive : "cannot delete Blog category",
  });
});
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
