const express = require('express');
require('express-async-errors');

const Products = require('../models/product');
const authnticationMiddleware = require('../middlewares/authentication');
const authorizationMiddleWare = require('../middlewares/authorization');

const router = express.Router();



router.post('/add', authnticationMiddleware, async (req, res, next) => {
    try {

        const {
            discount,
            price,
            imagesUrl,
            data,
            categoryId
        } = req.body;
        const userID = req.user.id;
        const product = new Products({
            userID,
            discount,
            price,
            imagesUrl,
            data,
            categoryId,
            createdAt: new Date()
        });

        await product.save();
        res.status(200).json(` ${product.data[0].name} added with ${product.data[0].description} and ${product}`);
    } catch (err) {
        next(err);
    }
})

router.get('/', async (req, res, next) => {

    const {
        limit,
        skip
    } = req.query;
    const id = req.user.id;
    const product = await Products.find().limit(limit ? +limit : 9).skip(skip ? +skip : 0);
    res.status(200).json(product);


})


router.patch('/:id', authnticationMiddleware, authorizationMiddleWare, async (req, res, next) => {

    const {
        id
    } = req.params;
    const userId = req.user.id;
    const product = await Products.findById(id);
    await product.update(req.body, {
        new: true,
        runValidators: true,
        omitUndefined: true
    })
    res.status(200).json(`${product}updated Successfuly`);


})


router.delete('/:id', authnticationMiddleware, authorizationMiddleWare, async (req, res, next) => {

    const userId = req.user.id;
    const product = await Products.findById(req.params.id);
    await Products.deleteOne(product);
    res.status(200).json("Deleted Successfuly");


})


module.exports = router;