const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
    dbName: "student_management"
  });
};

module.exports = connectDB;