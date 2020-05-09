const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;

require('express-async-errors');

const Products = require('../models/product');
const authnticationMiddleware = require('../middlewares/authentication');
const authorizationMiddleWare = require('../middlewares/authorization');

const parser = require("../middlewares/cloudinary");

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


router.post('/test', async (req, res, next) => {
    try {

        const {
            photo
        } = req.files;
        // console.log(req.files)
        // console.log(req);
        // const image = {};
        // image.url = req.files.url;
        // image.id = req.files.public_id;
        // parser.create(image) // save image information in database
        //     .then(newImage => res.json(newImage))
        //     .catch(err => console.log(err));

        cloudinary.uploader.upload(photo.tempFilePath, (err, result) => {
            console.log(result);
        res.status(200).json(result.url);

        })
        // await product.save();
        // res.status(200).json(image);
    } catch (err) {
        next(err);
    }
})




router.post('/add', authnticationMiddleware,  async (req, res, next) => {
    try {

        const {
            discount,
            price,
            imagesUrls,
            data,
            categoryId
        } = req.body;
        const userID = req.user.id;
        const product = new Products({
            userID,
            discount,
            price,
            imagesUrls,
            data,
            categoryId,
            // createdAt: new Date()
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
        skip,
        sortBy,
        sdir
    } = req.query;

    var sortObject = {};
    sortObject[sortBy] = sdir;


    const product = limit & sortBy ? await Products.find().limit(+limit).skip(+skip).sort(sortObject) :
        sortBy ? await Products.find().sort(sortObject) :
        limit ? await Products.find().limit(+limit).skip(+skip) :
        await Products.find();

    const numberOfProducts = await Products.count();
    // const product = await Products.find().limit(limit ? +limit : 9).skip(skip ? +skip : 0);
    res.status(200).json({
        product: product,
        numberOfProducts: numberOfProducts
    });
    // res.status(200).json(product
    //     // numberOfPages: Math.ceil(numberOfPages)
    // );

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


router.get('/:id', async (req, res, next) => {

    const {
        id
    } = req.params;
    const product = await Products.findById(id);

    res.status(200).json(product);


})

router.delete('/:id', authnticationMiddleware, authorizationMiddleWare, async (req, res, next) => {

    const userId = req.user.id;
    const product = await Products.findById(req.params.id);
    await Products.deleteOne(product);
    res.status(200).json("Deleted Successfuly");


})


module.exports = router;