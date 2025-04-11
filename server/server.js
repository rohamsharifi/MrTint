const { Sequelize, DataTypes } = require("sequelize");
const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');

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

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    user_location: {
        type: DataTypes.STRING,
    }
},
    {
        timestamps: false
    }
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

let verificationCodes = {};

app.post('/login', async (req, res) => {
    const { phone_number } = req.body;
    const verificationCode = Math.floor(10000 + Math.random() * 90000);
    verificationCodes[phone_number] = verificationCode;
    return res.status(200).json({ message: 'Verification code sent', code: verificationCode });
});



app.post('/login/verification', async (req, res) => {
    const { phone_number, code } = req.body;
    const user = await User.findOne({ where: { phone_number } });

    if (!user) {
        const newUser = await User.create({ phone_number });
    }

    const storedCode = verificationCodes[phone_number];

    if (code === storedCode.toString()) {
        // const token = jwt.sign({ phone_number }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Verified successfully' });

    }
    else {
        res.status(400).json({ message: 'Invalid verification code' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
