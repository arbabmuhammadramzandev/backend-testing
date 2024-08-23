const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: __dirname + "/../.env" });

const getAllCategory = async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) return res.status(404).json({ success: false });
  res.send(categoryList);
};

const getSpecificCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)
   
  if (!category) return res.status(404).json({ success: false });
  res.send(category);
};

const AddCategory = async (req, res) => {
  let category = new Category({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    subtitle: req.body.subtitle,
    url: req.body.url
  });
  category = await category.save();
  if (!category) return res.status(400).json({ success: false });
  res.send(category);
};

const EditCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    imageUrl: req.body.imageUrl,
    subtitle: req.body.subtitle,
    url: req.body.url
    },
    {
      new: true,
    }
  );
  if (!category) return res.status(400).json({ success: false });
  res.send(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ success: false });
  res.send(category);
};
module.exports = router;

module.exports = {
  getAllCategory,
  getSpecificCategory,
  AddCategory,
  EditCategory,
  deleteCategory
  
};
