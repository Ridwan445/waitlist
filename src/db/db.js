const mongoose = require("mongoose");

const connectDb = async (res, req) => {
  try {
  await mongoose.connect("mongodb+srv://waitlist:12345@cluster0.9dzvbpn.mongodb.net/")
  console.log("Connected to MongoDB");
} catch (error) {
  console.error(error.message);
 return res.status(503).json("Error while connecting db")
}
}

module.exports = connectDb