const express = require("express");
const bcrypt = require("bcryptjs");
const adminRouter = express.Router();

const Student = require("../models/student");

adminRouter.post("/api/admin/addStudents", async (req, res) => {
  try {
    const { name, email, department, password } = req.body;
    if (name && email && department && password) {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res
          .status(400)
          .json({ code: 0, message: "Student already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(password, salt);

      const student = new Student({
        name,
        email,
        department,
        password: securedPassword,
      });

      const data = await student.save();
      console.log("data --> ", data);
      res
        .status(200)
        .json({ code: 1, message: "Student added.", result: data });
    } else {
      res.status(400).send({ code: 0, message: "Bad Request" });
    }
  } catch (err) {
    res.status(400).send({ code: 0, message: err.message });
  }
});

adminRouter.post("/api/admin/addTasks", async (req, res) => {
  try {
    const { student_email, title, description, due_date, status } = req.body;

    if (!student_email || !title || !due_date || !status) {
      return res.status(400).json({ code: 0, message: "Bad Request" });
    }

    const student = await Student.findOne({ email: student_email });

    if (!student) {
      return res.status(404).json({ code: 0, message: "Student not found" });
    }

    student.tasks.push({
      title,
      description,
      due_date: due_date,
      status,
      updated_at: new Date(),
    });

    await student.save();

    return res
      .status(201)
      .json({ code: 1, message: "Task added successfully", student });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 0, message: "Server Error", error: err.message });
  }
});

module.exports = adminRouter;