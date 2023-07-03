const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBreand = asyncHandler(async (req, res) => {
  const responsive = await Brand.create(req.body);
  return res.status(200).json({
    success: responsive ? true : false,
    crearedBrand: responsive ? responsive : "cannot create new brand",
  });
});
const getBrands = asyncHandler(async (req, res) => {
  const responsive = await Brand.find().select("title");
  return res.status(200).json({
    success: responsive ? true : false,
    brands: responsive ? responsive : "cannot create new brand",
  });
});
const updateBrands = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const responsive = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: responsive ? true : false,
    updatedBrand: responsive ? responsive : "cannot update brand",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const responsive = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: responsive ? true : false,
    deletedBrand: responsive ? responsive : "cannot delete brand",
  });
});
module.exports = {
  createNewBreand,
  getBrands,
  updateBrands,
  deleteBrand,
};
