const express = require("express");
const app = express();
const path = require('path');
// const fileUpload = require("express-fileupload");
const mongodbConnect = require("./src/utils/dbConnection");

// import the env file

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const authJwt = require("./src/config/jwt");
const errorHandler = require("./src/config/error-handler");

require("dotenv/config");

const api = process.env.API_URL;
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const verifyRoute = require("./src/routes/verifyRoute");

const verifyJWT = require('./src/middlewares/verifyJWT');

const logger = require("./src/config/logger.config");

// Middlewares
// app.use(cors({
//   origin: ["https://customer-dashboard-ecommerce.vercel.app","https://www.customer-dashboard-ecommerce.vercel.app","www.customer-dashboard-ecommerce.vercel.app",,"customer-dashboard-ecommerce.vercel.app","https://www.gogenie.com","https://dev-ecommerce.vercel.app","https://croud-funding-next.vercel.app","www.gogenie.com", "https://ecommerce-nextjs-six.vercel.app","https://dev-ecommerce.vercel.app"]
// }));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use(errorHandler);
app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(fileUpload());
// app.use(verifyJWT)
//Routers

app.use(`${api}/verify`, verifyRoute);
app.use(`${api}/user`, userRoute);
app.use(`${api}/category`, categoryRoute);
app.use(`${api}/product`, productRoute);

//Moongoose connection
mongodbConnect.dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
