const mongoose = require("mongoose");
const validator = require("validator");

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
      const result = validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });
      console.log(`Password: ${value}, Validation Result: ${result}`);
      if (!result) {
        throw new Error("Enter a Strong Password: " + value);
      }
    },
  },
  tasks: [TasksSchema],
});

module.exports = mongoose.model("Student", StudentSchema);
