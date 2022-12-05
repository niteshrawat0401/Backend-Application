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

// Filter
userRouter.get("/:userid/filter", async (req, res) => {
  const userid = req.params.userid;
  try {
    const { page = 2, limit = 2 } = req.query;
    const feed = await profileData
      .find({ userId: userid })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = feed.length;
    res.send({ total, feed });
  } catch (e) {
    console.log(e);
  }
});

// Search
userRouter.get("/:userid/search/:key", async (req, res) => {
  // console.log(req.params.key);
  let sear = await profileData.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  res.send(sear);
  // const { userid } = req.params;
  // // const userid = req.params.userid;
  // var regex = new RegExp(req.params.key,"i")
  // await profileData.find({key:regex,userid:userid}).then((result)=>{
  //   res.status(200).json(result)
  //  })
});

// Sort
// userRouter.get("/:userid/sort", async(req,res)=>{
//   const userid= req.params;
//   try {
//     const userSort= await findById({_id: userid}).sort({_id:-1})
//     res.send(userSort)
//   } catch (error) {
//     res.send("error")
//   }
// })

module.exports = userRouter;
