var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },

    imagesUrl: {
            type: String
    },

}, {
    timestamps: true
})


schema.set('toJSON', {
    virtuals: true
});
schema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId'
})

const Category = mongoose.model('Category', schema);

module.exports = Category;