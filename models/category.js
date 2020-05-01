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

const Category = mongoose.model('Category', schema);

module.exports = Category;