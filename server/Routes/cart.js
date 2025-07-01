import express from 'express';
import authenticateToken from '../Middlewares/authenticateToken.js';
import Product from '../Models/Product.js';
import User from '../Models/User.js';
import CustomerProduct from '../Models/CustomerProduct.js';

const router = express.Router();

router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { productId, count } = req.body;
        const phoneNumber = req.user.phone_number;

        let product, user;
        Product.findOne({
            where: { id: productId }
        }).then((data) => {
            product = data;
            User.findOne({
                where: { phone_number: phoneNumber }
            }).then((data) => {
                user = data;
                user.addProduct(product, {
                    through: { productCount: count }
                }).then((data) => {
                    console.log(data);
                })
            })
        }).catch((err) => console.log(err));

        res.status(200).json({ message: `Product ${productId} x${count} added for ${phoneNumber}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/count', authenticateToken, async (req, res) => {
    const phoneNumber = req.user.phone_number;
    let userId;
    User.findOne({
        where: { phone_number: phoneNumber }
    }).then((data) => {
        userId = data.user_id;
        CustomerProduct.findAndCountAll({
            where: { userId }
        }).then((data) => {
            res.status(200).json({ count: data.count });
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    })
});

router.post('/get-products', authenticateToken, async (req, res) => {
    const phoneNumber = req.user.phone_number;
    let customer, products;
    User.findOne({
        where: { phone_number: phoneNumber }
    }).then((data) => {
        customer = data;
        customer.getProducts()
            .then((data) => {
                products = data;
                res.status(200).json({ products });
            })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    })
});

export default router;