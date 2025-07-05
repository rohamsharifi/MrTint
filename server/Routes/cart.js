import express from 'express';
import authenticateToken from '../Middlewares/authenticateToken.js';
import Product from '../Models/Product.js';
import User from '../Models/User.js';
import CustomerProduct from '../Models/CustomerProduct.js';

import { Op } from 'sequelize';

const router = express.Router();


router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { productId, count } = req.body;
        const phoneNumber = req.user.phone_number;

        const user = await User.findOne({ where: { phone_number: phoneNumber } });

        const product = await Product.findOne({ where: { id: productId } });

        await user.addProduct(product, {
            through: { productCount: count }
        })

        res.status(201).json({ message: `product ${productId} added to cart.` })

    } catch (err) {
        console.log('Add to cart error:', err);
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
        CustomerProduct.count({
            where: { userId }
        }).then((data) => {
            res.status(200).json({ count: data });
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
        customer.getProducts({
            through: {
                attributes: ['productCount']
            }
        }).then((data) => {
            products = data;
            res.status(200).json({ products });
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    })
});

router.post('/get-guest-products', async (req, res) => {
    const { productIds } = req.body;
    let products;
    Product.findAll({
        where: {
            id: {
                [Op.in]: productIds
            }
        }
    }).then((data) => {
        products = data;
        res.status(200).json({ products });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    })
});

router.delete('/delete/:productId', authenticateToken, async (req, res) => {
    const phoneNumber = req.user.phone_number;
    const productId = req.params.productId;

    let customer, product;

    User.findOne({
        where: { phone_number: phoneNumber }
    }).then((data) => {
        customer = data;
        Product.findByPk(productId)
            .then((data) => {
                product = data;
                customer.removeProduct(product)
                    .then(() => {
                        res.status(200).json({ message: 'Product deleted successfully!' });
                    })
            })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    })
});

export default router;