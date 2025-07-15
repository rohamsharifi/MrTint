import express from 'express';

import SubCategory from '../Models/SubCategory.js';
import Product from '../Models/Product.js';

const router = express.Router();

router.get('/:maincategory', async (req, res) => {
    const maincategory = req.params.maincategory;
    let maincategoryId;

    if (maincategory === 'painting_tools') maincategoryId = 1;
    if (maincategory === 'car_paint') maincategoryId = 2;
    if (maincategory === 'wood_paint') maincategoryId = 3;
    if (maincategory === 'house_paint') maincategoryId = 4;
    if (maincategory === 'industrial_paint') maincategoryId = 5;

    SubCategory.findAll({ where: { McId: maincategoryId } }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Faild to fetch subCategories' });
    })
})

router.get('/:maincategory/products', async (req, res) => {
    const maincategory = req.params.maincategory;
    const page = parseInt(req.query.currentPage);
    const limit = parseInt(req.query.limit);
    const subcategory = req.query.checkboxLabel;

    const offset = (page - 1) * limit;
    let maincategoryId;

    if (maincategory === 'painting_tools') maincategoryId = 1;
    if (maincategory === 'car_paint') maincategoryId = 2;
    if (maincategory === 'wood_paint') maincategoryId = 3;
    if (maincategory === 'house_paint') maincategoryId = 4;
    if (maincategory === 'industrial_paint') maincategoryId = 5;

    if (subcategory) {
        Product.findAndCountAll({
            include: {
                model: SubCategory,
                where: { ScName: subcategory }
            },
            limit: limit,
            offset: offset,
        }).then(({ rows, count }) => {
            const totalPages = Math.ceil(count / limit);
            res.status(200).json({ products: rows, totalPages });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Faild to fetch subCategories' });
        })
    } else {
        console.log('It\'s the else scope!');
        Product.findAndCountAll({
            include: {
                model: SubCategory,
                where: { McId: maincategoryId },
            },
            limit: limit,
            offset: offset,
        }).then(({ rows, count }) => {
            const totalPages = Math.ceil(count / limit);
            res.status(200).json({ products: rows, totalPages });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Faild to fetch subCategories' });
        })
    }
})

export default router;