const express = require('express');
require('express-async-errors');

const Categories = require('../models/category');

const router = express.Router();

router.get('/filter', async (req, res, next) => {

    const {
        limit,
        skip,
        catName
    } = req.query;
   
    const category = await Categories.find({
       name: catName
    }).populate('products').limit(limit ? +limit : 9).skip(skip ? +skip : 0).exec();
    
    // const test = await Categories.find();
    res.status(200).json(category);


})


router.get('/', async (req, res, next) => {


    const category = await Categories.find();
    res.status(200).json(category);


})

router.post('/add', async (req, res, next) => {
    try {

        const {
            name
        } = req.body;
        const category = new Categories({
            name
        });
        await category.save();
            res.status(200).json(` reqisterd successfully`);
    } catch (err) {
        err.statusCode = 422;
        next(err);
    }

})


module.exports = router;