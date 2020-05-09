const express = require('express');
require('express-async-errors');

const Categories = require('../models/category');

const router = express.Router();

router.get('/filter/:id', async (req, res, next) => {

    const {
        limit,
        skip,
        sortBy,
        sdir
        
    } = req.query;

   const {
       id
   } = req.params;

    // const products = await Categories.find({
    //    _id: id
    // }).populate('products').limit(+limit).skip(+skip).exec();
    
var stype = `{${sortBy}:${sdir}}`;
// var stype = `sort : {price:${sdir}}`;


      const products = await Categories.find({
          _id: id
      }).populate({
          path: 'products',
          options: {
              sort: sortBy
          }
      }).limit(+limit).skip(+skip).exec();
// products.to
    // const test = await Categories.find();
     res.status(200).json( products );


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

router.get('/:id', async (req, res, next) => {

    const {
        id
    } = req.params;
    const category = await Categories.findById(id);

    res.status(200).json(category);


})
module.exports = router;