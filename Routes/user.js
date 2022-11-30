const { Router } = require("express");
const profileData = require("../model/userProfle");

const userRouter = Router();

userRouter.post("/:userid/userdata", (req, res) => {
  const { userid } = req.params;
  const { name, Date, Department } = req.body;
  const userdatas = new profileData({
    name,
    Date,
    Department,
    userId: userid,
  });
  userdatas.save((err, success) => {
    try {
      return res
        .status(200)
        .send({ message: "User added", userdatas: success["_doc"] });
    } catch (error) {
      return res.status(500).send({ message: "something went wrong" });
    }
  });
});

module.exports= userRouter