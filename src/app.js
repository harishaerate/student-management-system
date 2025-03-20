const express = require("express");
const app = express();
const http = require("http");
const connectDB = require("./config/database");

const server = http.createServer(app);
app.use(express.json());

require("dotenv").config();

const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");
const addTasks = require("./routes/admin");
const studentRouter = require("./routes/student");

app.use("/", loginRouter);
app.use("/", adminRouter);
app.use("/", addTasks);
app.use("/", studentRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log(
        "Server is successfully listening on port ---> " + process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!", err);
  });
