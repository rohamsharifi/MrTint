import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
    }
);

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(63),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    },
    size: {
        type: DataTypes.INTEGER
    },
    brand: {
        type: DataTypes.STRING(15)
    },
    inventory: {
        type: DataTypes.INTEGER
    },
    keyWord: {
        type: DataTypes.STRING(31)
    },
    soldCount: {
        type: DataTypes.INTEGER
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    ScId: {
        type: DataTypes.INTEGER
    },
},
    {
        timestamps: false
    }
);

export default Product;