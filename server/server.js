import { Sequelize, Op } from "sequelize";
import jwt from "jsonwebtoken";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

// IMPORTING MODELS.
import User from './Models/User.js'
import VerificationCode from './Models/VerificationCode.js'
import MainCategory from './Models/MainCategory.js'
import SubCategory from './Models/SubCategory.js'
import Product from './Models/Product.js';
import CustomerProduct from "./Models/CustomerProduct.js";

// IMPORTING ROUTES
import cartRoutes from './Routes/cart.js';
import subcategoryRoutes from './Routes/subcategories.js';

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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// ASSOCIATIONS.
MainCategory.hasMany(SubCategory, { foreignKey: 'McId' });
SubCategory.belongsTo(MainCategory, { foreignKey: 'McId' });

SubCategory.hasMany(Product, { foreignKey: 'ScId' });
Product.belongsTo(SubCategory, { foreignKey: 'ScId' });

User.belongsToMany(Product, {
    through: CustomerProduct,
    foreignKey: 'userId'
});
Product.belongsToMany(User, {
    through: CustomerProduct,
    foreignKey: 'productId'
});


CustomerProduct.sync({ alter: true }).then(() => {

}).catch((err) => {
    console.log(err);
});

// ROUTING.
app.post('/login', async (req, res) => {
    const { phone_number } = req.body;
    const userCodeExist = await VerificationCode.findOne({
        where: {
            phone_number,
            isUsed: false,
            expiresAt: { [Op.gt]: new Date() }
        }
    });
    if (userCodeExist) {
        userCodeExist.isUsed = true;
        await userCodeExist.save();
    };
    const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
    await VerificationCode.create({
        phone_number: phone_number,
        code: verificationCode,
    });
    return res.status(200).json({ message: 'Verification code sent', code: verificationCode });
});


app.post('/login/verification', async (req, res) => {
    const { phone_number, code } = req.body;
    const user = await User.findOne({ where: { phone_number } });

    if (!user) {
        await User.create({ phone_number });
    }

    const record = await VerificationCode.findOne({
        where:
        {
            phone_number,
            isUsed: false,
            expiresAt: { [Op.gt]: new Date() }

        }
    });
    if (!record) {
        res.status(400).json({ message: 'Verification code not expired' });
    } else {
        const storedCode = record.code;

        if (code === storedCode.toString()) {
            const token = jwt.sign({ phone_number }, process.env.JWT_SECRET, { expiresIn: '1h' });
            record.isUsed = true;
            await record.save();
            res.status(200).json({ token });
        }
        else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    }
});


// ROUTES

app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
