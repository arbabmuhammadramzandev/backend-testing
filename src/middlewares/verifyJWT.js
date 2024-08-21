const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    if(
       req.url === "/api/v1/verify" ||
       req.url === `/api/v1/user/login` ||
       req.url === `/api/v1/user/register`||
       req.url ===  `/api/v1/user/verify`||
       req.url ===  `/api/v1/user/register/admin`||
       req.url === `/api/v1/user/login/admin`||
       req.url === `/api/v1/uploads`||
       req.url === `/api/v1/popup`||
       req.url === `/api/v1/uploads/*`||
       req.url === `/public/*`
    ) return next();
    const authHeader =  req.headers.authorization;
    console.log("req", req.headers)
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            console.log("err",err)
            if (err) return res.sendStatus(403); //invalid token
            console.log("decoded",decoded)
            // req.user = decoded?.UserInfo?.role;
            req.roles = decoded?.UserInfo?.roles;
            next();
        }
    );
}

module.exports = verifyJWT