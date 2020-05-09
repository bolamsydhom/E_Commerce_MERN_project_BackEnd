const Products = require('../models/product');
const customeError = require('../helpers/customeError');

module.exports = async (req, res, next) => {


        const {params:{id: productId}, user:{id: userId}}=req;
        const product = await Products.findById(productId);
        if(!product.userID.equals(userId)) throw customeError(403,'Not Authorized')
        req.isAuth = true;
        next();

}