const mongoose = require("mongoose");

const waitSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true,
    unique: true
  }
})
const waitModel = mongoose.model("Wait", waitSchema)
module.exports = waitModel