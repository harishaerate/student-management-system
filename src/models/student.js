const mongoose = require("mongoose");

const TasksSchema = require("./tasks");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    },
  },
  department: { type: String, required: true },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a Strong Password: " + value);
      }
    },
  },
  tasks: [TasksSchema]
});

module.exports = mongoose.model("Student", StudentSchema);
