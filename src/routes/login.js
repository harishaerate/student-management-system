const express = require("express");
const bcrypt = require("bcryptjs");
const loginRouter = express.Router();
const Student = require("../models/student");

require("dotenv").config();

//This API helps admin to login
loginRouter.post("/api/admin/login", async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const { email, password } = req.body;

    if (email && password) {
      if (email === adminEmail && password === adminPassword) {
        res
          .status(200)
          .json({ code: 1, message: "Admin logged in successfully" });
      } else {
        res.status(200).json({
          code: 0,
          message: "Invalid admin credentials",
        });
      }
    } else {
      res.status(400).send({ code: 0, message: "Bad Request" });
    }
  } catch (err) {
    res.status(400).send({ code: 0, message: err.message });
  }
});

//This API helps students to login
loginRouter.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.headers;

    if (!email || !password) {
      return res.status(400).json({ code: 0, message: "Email and password are required" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ code: 0, message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ code: 0, message: "Invalid credentials" });
    }

    res.status(200).json({ 
      code: 1, 
      message: "Login successful", 
      student: { email: student.email, name: student.name, department: student.department }
    });

  } catch (err) {
    res.status(500).json({ code: 0, message: "Internal Server Error", error: err.message });
  }
});

module.exports = loginRouter;
