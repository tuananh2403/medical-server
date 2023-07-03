const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("missing put");
  const responsive = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: responsive ? true : false,
    responsive: responsive ? responsive : "cannot create new coupon",
  });
});
const getCoupon = asyncHandler(async (req, res) => {
  const responsive = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: responsive ? true : false,
    coupons: responsive ? responsive : "cannot get coupons",
  });
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("missing put");
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  const responsive = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: responsive ? true : false,
    updatedCoupon: responsive ? responsive : "cannot create coupon",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const responsive = await Coupon.findByIdAndDelete(cid);
  return res.status(200).json({
    success: responsive ? true : false,
    deletedCoupon: responsive ? responsive : "cannot delete coupon",
  });
});
module.exports = {
  createNewCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
