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

// get
userRouter.get("/:userid/userdata", async (req, res) => {
  const { userid } = req.params;
  const userdatas = await profileData.find({ userId: userid });
  res.send(userdatas);
});

// Delete
userRouter.delete("/:userid/employee/:employeeId", async (req, res) => {
  const userid = req.params.userid;
  const employeeid = req.params.employeeId;
  const userEmployee = await profileData
    .deleteOne({ _id: employeeid, userid: userid })
    .then((result) => {
      return res.status(201).send({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      return res.status(401).send({ message: "Somethinf went wrong" });
    });
});

// Patch
userRouter.patch("/:userid/employee/:employeeId", async (req, res) => {
  const { userid } = req.params;
  const { employeeId } = req.params;
  const employee = await profileData.findOne({ _id: employeeId });
  if (employee.userId == userid) {
    let update = await profileData.findByIdAndUpdate(
      { _id: employeeId },
      req.body,
      { new: true }
    );
    return res.send({ message: "update Successfull", update });
  } else {
    return res.send({ message: "Something went wrong" });
  }
});

module.exports = userRouter;
