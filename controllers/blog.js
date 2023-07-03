const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("missing put");
  const responsive = await Blog.create(req.body);
  return res.status(200).json({
    success: responsive ? true : false,
    responsive: responsive ? responsive : "cannot create new blog",
  });
});
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("missing put");
  const responsive = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    success: responsive ? true : false,
    responsive: responsive ? responsive : "cannot create new blog",
  });
});
const getBlogs = asyncHandler(async (req, res) => {
  const responsive = await Blog.find();
  return res.status(200).json({
    success: responsive ? true : false,
    responsive: responsive ? responsive : "cannot create new blog",
  });
});
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  //   console.log(bid);
  if (!bid) throw new Error("missing input");
  const blog = await Blog.findById(bid);
  //   console.log(blog);
  const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  //   console.log(alreadyDisliked);
  if (alreadyDisliked) {
    await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
  }
  const isLiked = blog?.likes?.find((el) => {
    console.log(el.toString());
    return el.toString() === _id;
  });
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
});
const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  //   console.log(bid);
  if (!bid) throw new Error("missing input");
  const blog = await Blog.findById(bid);
  //   console.log(blog);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  //   console.log(alreadyDisliked);
  if (alreadyLiked) {
    await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
  }
  const isDisLiked = blog?.disLikes?.find((el) => {
    console.log(el.toString());
    return el.toString() === _id;
  });
  if (isDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", "firstname lastname")
    .populate("disLikes", "firstname lastname");
  return res.status(200).json({
    success: response ? true : false,
    rs: response,
  });
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);

  return res.status(200).json({
    success: response ? true : false,
    deleted: response || "something went wrong",
  });
});
const uploadImagesBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  console.log(req.file);
  if (!req.file) throw new Error("Missing input");
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedBlog: response ? response : "cannot upload image blog",
  });
});
module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  disLikeBlog,
  getBlog,
  deleteBlog,
  uploadImagesBlog,
};
