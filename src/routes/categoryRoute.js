const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  getSpecificCategory,
  AddCategory,
  EditCategory,
  deleteCategory
  
} = require("../controllers/category");


router.post("/", AddCategory);


router.put("/:id", EditCategory);

router.get(`/`, getAllCategory);

router.get("/:id",getSpecificCategory);


router.delete("/:id", deleteCategory);

module.exports = router;
