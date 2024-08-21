const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config({ path: __dirname + "/../.env" });

const getAllUser = async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) return res.status(404).json({ success: false });
  res.send(userList);
};

const getSpecificUser = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-passwordHash")
  if (!user) return res.status(404).json({ success: false });
  res.send(user);
};
const getSpecificUserByEmail = async (req, res) => {
  const user = await User.find({ email: req.params.email })
    .select("-passwordHash")
  if (!user) return res.status(404).json({ success: false });
  res.send(user);
};

const registerUser = async (req, res) => {
  const userFinder = await User.findOne({ email: req.body.email });
  if (userFinder) {
    return res.status(400).json({
      success: false,
      message: "User already registered",
    });
  }
  let user = new User({
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    personRole: req.body.personRole,
    verified: req.body.verified,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    role: req.body.role
  });
  user = await user.save();
  if (!user) return res.status(400).json({ success: false });
  res.send(user);
};

const editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      role: req.body.role,
      personRole: req.body.personRole,
      roleForCompany: req.body.roleForCompany,
    },
    {
      new: true,
    }
  );
  if (!user) return res.status(400).json({ success: false });
  res.send(user);
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // const personRole = user.personRole
  const secret = process.env.JWT_SECRET;
  if (!user) {
    return res.status(400).send({ message: "The user has not been found" });
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
   
    const token = jwt.sign(
      {
        "UserInfo": {
          "userId": user.id
         }
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({role: "admin", user: user.email, token: token, id: user._id, isUser: user.isUser});
  } else {
    res.status(400).send({ message: "Invalid password!" });
  }
};
const verifyUser = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const role = "admin"
    const token = jwt.verify(
      req.body.token,
      secret,
      role
    )
    res.status(200).send(token);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false });
  res.send(user);
};
module.exports = router;

module.exports = {
  getAllUser,
  getSpecificUser,
  registerUser,
  editUser,
  loginUser,
  deleteUser,
  loginUser,
  
  getSpecificUserByEmail,
  verifyUser
};
