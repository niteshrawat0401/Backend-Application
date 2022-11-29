const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
});

const User = model(User, UserSchema);
module.exports = User;
