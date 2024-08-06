const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
const { dbConnection } = require("./config/dbConnection");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const UserRoute = require("./Routes/UserRoute");

app.use(express.json());
app.use(cookie());
app.use(cors());
app.use("/api", UserRoute);

dbConnection(process.env.URI);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});
