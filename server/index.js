const sequelize = require("./config/database");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced!");
}).catch((err) => {
  console.log("Error syncing!", err)
})
