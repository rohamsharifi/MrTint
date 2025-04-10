const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    user_location: {
        type: DataTypes.STRING,
    }
});

module.exports = User;
