const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const dataProduct = require("../../data/dataProduct.json");
const dataCategory = require("../../data/dataCategory.json");
const slugify = require("slugify");
const fn = async (product) => {
  await Product.create({
    title: product?.title,
    slug: slugify(product?.title) + Math.round(Math.random() * 100) + "",
    decription: product?.description,
    brand: product?.brand,
    price: Number(product?.price?.match(/\d/g)?.join("")) || 100,
    category: product?.categories[3] || product?.categories[2],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.image,
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  const promise = [];
  for (let product of dataProduct) promise.push(fn(product));
  await Promise.all(promise);
  return res.json("done");
});
const fnCategory = async (category) => {
  await ProductCategory.create({
    title: category?.category,
    variants: category?.variants,
  });
};
const insertCategory = asyncHandler(async (req, res) => {
  const promise = [];
  for (let category of dataCategory) promise.push(fnCategory(category));
  await Promise.all(promise);
  return res.json("done");
});
module.exports = {
  insertProduct,
  insertCategory,
};
