const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  deleteUser,
  editUser,
  getAllUser,
  getSpecificUser,
  verifyUser,
  getSpecificUserByEmail,
} = require("../controllers/user.js");


router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/verify", verifyUser);

router.put("/:id", editUser);

router.get(`/`, getAllUser);

router.get("/:id",getSpecificUser);
router.get("/get/:email", getSpecificUserByEmail);


router.delete("/:id", deleteUser);

module.exports = router;
