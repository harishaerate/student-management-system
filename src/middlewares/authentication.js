const Student = require("../models/student");
const bcrypt = require("bcryptjs");

const authenticateStudent = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ code: 0, message: "Missing or invalid authorization header" });
      }

      const credentials = authHeader.split(" ")[1];
      const [email, password] = credentials.split(":");
  
      if (!email || !password) {
        return res.status(401).json({ code: 0, message: "Invalid authentication format" });
      }
  
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({ code: 0, message: "Student not found" });
      }
  
      const isMatch = await bcrypt.compare(password, student.password);
      if(!isMatch){
        return res.status(401).json({ code: 0, message: "Invalid credentials" });
      }
  
      req.student = student;
      next();
    } catch (err) {
      return res.status(500).json({ code: 0, message: "Authentication error", error: err.message });
    }
  };

  module.exports = authenticateStudent;