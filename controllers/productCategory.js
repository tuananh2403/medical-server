const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const responsive = await ProductCategory.create(req.body);
  return res.status(200).json({
    success: responsive ? true : false,
    crearedCategory: responsive
      ? responsive
      : "cannot create new product category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const responsive = await ProductCategory.find();
  return res.status(200).json({
    success: responsive ? true : false,
    productCategories: responsive
      ? responsive
      : "cannot create new product category",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const responsive = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: responsive ? true : false,
    updatedCategory: responsive ? responsive : "cannot update product category",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const responsive = await ProductCategory.findByIdAndDelete(pcid);
  return res.status(200).json({
    success: responsive ? true : false,
    deletedCategory: responsive ? responsive : "cannot delete product category",
  });
});
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
