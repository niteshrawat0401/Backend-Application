const mongoose= require("mongoose");
mongoose.set('strictQuery', true);
module.exports= mongoose.connect("mongodb://localhost:27017/allUserDoc");