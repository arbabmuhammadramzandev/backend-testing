const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getAllUser,
} = require("../controllers/user.js");


router.post(`/`, (req, res) => {
    const authHeader =  req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        req.body.token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            console.log("err",err)
            if (err) return res.send({statusCode: 404, message: "Invalid Token!"}); //invalid token
           res.send({statusCode: 200, message: "Token Is Valid!"})
        }
    );
});



module.exports = router;
