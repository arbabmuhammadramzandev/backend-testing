const { Category } = require("../models/product");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: __dirname + "/../.env" });

const getAllProduct = async (req, res) => {
  const productList = await Product.find();
  if (!productList) return res.status(404).json({ success: false });
  res.send(productList);
};

const getSpecificProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
   
  if (!product) return res.status(404).json({ success: false });
  res.send(product);
};

const AddProduct = async (req, res) => {
  let product = new Product({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    category: req.body.category
  });
  product = await product.save();
  if (!product) return res.status(400).json({ success: false });
  res.send(product);
};

const EditProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    category: req.body.category
    },
    {
      new: true,
    }
  );
  if (!product) return res.status(400).json({ success: false });
  res.send(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false });
  res.send(product);
};
module.exports = router;

module.exports = {
  getAllProduct,
  getSpecificProduct,
  AddProduct,
  EditProduct,
  deleteProduct
  
};
