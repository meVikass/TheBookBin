let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  bookId: { type: String, require: true },
  userId: { type: String, require: true },
});

module.exports = mongoose.model("Order", schema);
