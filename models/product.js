var mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
         name: {
             type: String,
             minlength: 3,
             maxlength: 20,
             required: true
         },
         description: {
             type: String,
             minlength: 10,
             maxlength: 500,
             required: true
         },
         lang: {
             id: {
                 type: Number,
                 default: 1
             },
             name: {
                 type: String,
                 default: "eng"
             }
         }
     
})
const schema = new mongoose.Schema({
    userID: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },

    data: [dataSchema],

    discount: {
        type: Number
    },

    price: {
        type: Number,
        required: true
    },

    imagesUrls: {
        type: [{
            type: String
        }]
    },

    categoryId : {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    }


}, {
    timestamps: true
})



const Product = mongoose.model('Product', schema);

module.exports = Product;