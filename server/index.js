const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");

const app = express();
app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced!");
}).catch((err) => {
  console.log("Error syncing!", err)
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
