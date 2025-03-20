const express = require("express");
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const authenticateStudent = require("../middlewares/authentication");
const studentRouter = express.Router();

studentRouter.get(
  "/api/student/view_tasks",
  authenticateStudent,
  async (req, res) => {
    try {
      return res.status(200).json({
        code: 1,
        message: "Tasks retrieved successfully",
        tasks: req.student.tasks,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ code: 0, message: "Server Error", error: err.message });
    }
  }
);

studentRouter.get(
  "/api/student/task_status",
  authenticateStudent,
  async (req, res) => {
    try {
      const { title } = req.query;

      if (!title) {
        return res
          .status(400)
          .json({ code: 0, message: "Task title is required" });
      }
      
      const tasks = req.student.tasks.filter((task) => task.title === title);

      if (tasks.length === 0) {
        return res.status(404).json({ code: 0, message: "Task not found" });
      }

      return res.status(200).json({
        code: 1,
        message: "Task statuses retrieved successfully",
        title: title,
        tasks: tasks.map((task) => ({
          description: task.description,
          due_date: task.due_date,
          status: task.status,
        })),
      });
    } catch (err) {
      return res
        .status(500)
        .json({ code: 0, message: "Server Error", error: err.message });
    }
  }
);

studentRouter.post(
  "/api/student/update_task",
  authenticateStudent,
  async (req, res) => {
    try {
      const { title, new_status } = req.body;

      if (!title || !new_status) {
        return res
          .status(400)
          .json({ code: 0, message: "Title and new_status are required" });
      }

      const taskIndex = req.student.tasks.findIndex(
        (task) => task.title === title
      );
      if (taskIndex === -1) {
        return res.status(404).json({ code: 0, message: "Task not found" });
      }

      req.student.tasks[taskIndex].status = new_status;
      req.student.tasks[taskIndex].updated_at = new Date();

      await req.student.save();

      return res.status(200).json({
        code: 1,
        message: "Task status updated successfully",
        updated_task: req.student.tasks[taskIndex],
      });
    } catch (err) {
      return res
        .status(500)
        .json({ code: 0, message: "Server Error", error: err.message });
    }
  }
);

module.exports = studentRouter;
