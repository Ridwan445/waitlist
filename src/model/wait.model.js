const mongoose = require("mongoose");

const waitSchema = new mongoose.Schema({
  customerName: String,
  productName: String,
  customerEmail: String,
})
const waitModel = mongoose.model("Wait", waitSchema)
module.exports = waitModel