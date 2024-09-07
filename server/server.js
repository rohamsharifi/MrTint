const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost/mrtint")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("could not connect", err));

const userSchema = new mongoose.Schema({
  name: String,
  familyName: String,
  phoneNumber: String,
  password: String,
  Address: String,
});

const User = mongoose.model("User", userSchema);

async function createUser(newUser) {
  const user = new User(newUser);

  const result = await user.save();
  console.log(result);
}

async function getProducts() {
  return await Product.find();
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/products", (req, res) => {
  (async () => {
    const products = await getProducts();
    res.json({ products });
  })();
});

app.use("/api/createuser", (req, res) => {
  res.send("creating product...");
  createUser(req.body);
});

app.get("/verification-code", (req, res) => {
  (async () => {
    const code = Math.random() * (99999 - 10000) + 10000;
    res.json({ code });
  })();
});

app.use("/checknumber", (req, res) => {
  (async () => {
    const user = await User.find({ phoneNumber: req.body.phone });
    res.json({ user });
  })();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
