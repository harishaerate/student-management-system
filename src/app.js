const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/database");
const { error } = require("console");

const server = http.createServer(app);
app.use(express.json());
// app.use(cookieParser());

require("dotenv").config();

const loginRouter = require("./routes/login");

app.use("/", loginRouter);


connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port ---> " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!", err);
  });
