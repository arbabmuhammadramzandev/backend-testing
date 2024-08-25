const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getSpecificProduct,
  AddProduct,
  EditProduct,
  deleteProduct
  
} = require("../controllers/product");


router.post("/", AddProduct);


router.put("/:id", EditProduct);

router.get(`/`, getAllProduct);

router.get("/:id",getSpecificProduct);


router.delete("/:id", deleteProduct);

module.exports = router;
