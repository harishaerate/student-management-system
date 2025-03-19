const express = require("express");
const loginRouter = express.Router();

require("dotenv").config();

//This API helps admin to login
loginRouter.post("/api/admin/login", async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const { email, password } = req.body;

    if (email && password) {
      if (
        email === adminEmail &&
        password === adminPassword
      ) {
        res
          .status(200)
          .json({ status: 1, message: "Admin logged in successfully" });
      }else{
        res.status(200).json({
            status: 0,
            message: "Invalid admin credentials",
          });
      }
    } else {
        res.status(400).send({status: 0, message: "Bad Request"});
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//This API helps students to login
loginRouter.post("/student/login", async (req, res) => {
  try {
    
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = loginRouter;
