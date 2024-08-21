const expressJwt = require("express-jwt");
require("dotenv").config({ path: __dirname + "/../.env" });

function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;
  return expressJwt({
    secret: secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      `${api}/user/login`,
      `${api}/product/search`,
      `${api}/user/register`,
      `${api}/user/verify`,
      `${api}/user/register/admin`,
      `${api}/customer/register`,
      `${api}/investor/register`,
      `${api}/user/login/admin`,
      `${api}/customer/login`,
      `${api}/investor/login`,
      `${api}/rider/login`,
      `${api}/rider/register`,
      `${api}/contact/create`,
      `/api/v1/uploads`,
      `/api/v1/uploads/*`,
      `/public/*`,
    ],
  });
}
async function isRevoked(req, payload, done) {
  done();
}
module.exports = authJwt;
