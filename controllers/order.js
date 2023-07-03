const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");

const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ oderBy: _id });
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title slug price");
  console.log(_id);
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    totalItem: el.product.price * el.quantity,
  }));
  let total = userCart?.cart?.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );

  if (response.length === 0) {
    const rs = await Order.create({
      products,
      total,
      coupon,
      oderBy: _id,
    });
    return res.status(200).json({
      success: rs ? true : false,
      rs: rs ? rs : "somthing went wrong",
    });
  } else {
    const rs = await Order.deleteOne({ oderBy: _id });
    const response = await Order.create({
      products,
      total,
      coupon,
      oderBy: _id,
    });
    return res.status(200).json({
      success: response ? true : false,
      rs: response ? response : "somthing went wrong",
    });
  }
});
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "somthing went wrong",
  });
});
const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const response = await Order.find({ oderBy: _id });
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "somthing went wrong",
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
};
