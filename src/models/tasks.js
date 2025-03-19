const mongoose = require("mongoose");
const validator = require("validator");

const TasksSchema = new mongoose.Schema({
  student_email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    },
  },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "overdue", "completed"], default: "pending" }
});

module.exports = mongoose.model("Tasks", TasksSchema);
