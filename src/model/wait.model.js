const mongoose = require("mongoose");

const waitSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})
const waitModel = mongoose.model("Wait", waitSchema)
module.exports = waitModel