const express = require("express");
const mongoose = require("mongoose");
const { register, login, authenticateToken } = require("./src/auth/auth");
const User = require("./src/models/Userauth");

require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((error) => {
    console.error("Error connecting to mongoDB:", error);
  });

app.post("/register", register);
app.post("/login", login);

app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
