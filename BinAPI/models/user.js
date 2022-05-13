let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let schema = new Schema({
  email: { type: String, require: true },
  userName: { type: String, require: true },
  password: { type: String, require: true },
  creationDate: { type: Date, require: true },
});

schema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

schema.methods.isValid = function (hashedPassword) {
  return bcrypt.compareSync(hashedPassword, this.password);
};

module.exports = mongoose.model("User", schema);
