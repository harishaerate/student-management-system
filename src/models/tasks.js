const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  due_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "overdue", "completed"],
    default: "pending",
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = TasksSchema;