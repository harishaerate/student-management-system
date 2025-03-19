const express = require("express");
const adminRouter = express.Router();

const Student = require("../models/student");
const Tasks = require("../models/tasks");

adminRouter.post("/api/admin/addStudents", async (req, res) => {
  try {
    const { name, email, department, password } = req.body;
    if (name && email && department && password) {
      const student = new Student({
        name, email, department, password
      });
      const data = await student.save();
      console.log("data --> ", data);
      res.status(200).json({ code: 1, message: "Student added.", result: data });
    } else {
      res.status(400).send({ code: 0, message: "Bad Request" });
    }
  } catch (err) {
    res.status(400).send({code: 0, message: err.message});
  }
});


adminRouter.post("/api/admin/addTasks", async (req, res) => {
    try {
      const { student_email, title, description, due_date, status  } = req.body;
      if (student_email && title && due_date && status) {
        let dueDate = new Date(due_date);
        const task = new Tasks({
            student_email, title, description, dueDate, status
        });
        const data = await task.save();
        console.log("data --> ", data);
        res.status(200).json({ code: 1, message: "Task Added.", result: data });
      } else {
        res.status(400).send({ code: 0, message: "Bad Request" });
      }
    } catch (err) {
      res.status(400).send({code: 0, message: err.message});
    }
  });

module.exports = adminRouter;
