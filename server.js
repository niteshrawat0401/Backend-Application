const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(8080, () => {
  console.log(`Server started at http://localhost:8080`);
});
