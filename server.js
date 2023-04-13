const express = require("express");
const connection = require("./db/db");
const authRouter = require("./Routes/authUser");
const noteRouter = require("./Routes/noteRouter");
const userRouter= require("./Routes/user")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/emp", noteRouter)

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started at http://localhost:8080`);
});
