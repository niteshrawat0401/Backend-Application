const { Router } = require("express");
const User = require("../model/auth");
const Jwt= require("jsonwebtoken");
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

// Login
authRouter.post("/login", async(req,res)=>{
    const {username, password}= req.body;
    const validuser= await User.find({username, password});
    if(validuser.length < 1 || !validuser){
        return res.status(401).send({message: "Invalid Credentials"})
    }
    // token 1
    const token= Jwt.sign({
        username
    },
        "SECRET",{
            expiresIn:"1 hour"
        }
    ) 
    // token 2
    const refreshToken= Jwt.sign({
        username
    },
    "REFRESHPASSWORD",{
        expiresIn: "30days"
    })
    let {_id}= validuser[0]
    return res.send({message: "Login Successfully", token: token, refreshToken: refreshToken, _id})
})

module.exports = authRouter;
