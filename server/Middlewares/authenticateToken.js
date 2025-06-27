import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];  // ✅ Get the token part (after "Bearer ")

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;  // ✅ Attach decoded user info (like phone_number) to request
        next();
    });
};

export default authenticateToken;