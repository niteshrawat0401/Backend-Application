const { model, Schema } = require("mongoose");

const UserDataSchema = new Schema({
  name: String,
  Date: String,
  Department: String,
  userId: String,
});

const profileData = model("UserData", UserDataSchema);
module.exports = profileData;
