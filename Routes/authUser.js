const { Router } = require("express");
const User = require("../model/auth");
const authRouter = Router();

// Sign up
authRouter.post("/signup", (req, res) => {
  const user = new User(req.body);
  user.save((err, success) => {
    try {
      return res
        .status(201)
        .send({ message: "Sign up Successfully", user: success["_doc"] });
    } catch (error) {
      return res.status(500).send({ message: "Something wen wrong" });
    }
  });
});

module.exports = authRouter;
