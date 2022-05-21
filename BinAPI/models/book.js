let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  bookName: { type: String, require: true },
  authorName: { type: String, require: true },
  genres: { type: String, require: true },
  price: { type: Number },
  year: { type: Number },
  rating: { type: Number },
  pageCount: { type: Number },
  creationDate: { type: Date, require: true },
  comments: [{ userId: String, userName: String, comment: String }],
});

module.exports = mongoose.model("Book", schema);
