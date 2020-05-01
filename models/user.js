var mongoose = require('mongoose');
require('mongoose-type-email');

const bcrypt = require('bcrypt');
const util =  require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify)
const jwtSercret = process.env.jwt;


const schema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

schema.set('toJSON', {
    virtuals: true
});
schema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'userID'
})

schema.pre('save', async function () {
    const userInstance = this;
    if (this.isModified('password')) {
        userInstance.password = await bcrypt.hash(userInstance.password, 7)
    }
});


schema.statics.getUserfromToken = async function (token) {
    const User = this;
    const payload = await verify(token, jwtSercret);
    const currentUser = await User.findById(payload.currentUserId);
    if (!currentUser) throw new Error('user not found');
    return currentUser;
}


schema.methods.generateToken = function (expiresIn= '30m') {
    const userInstance = this;
    return sign({currentUserId: userInstance.id},jwtSercret,{expiresIn})
};


schema.methods.comparePassword = function (myPlainText) {
    const userInstance = this;
    return bcrypt.compare(myPlainText,userInstance.password);
};


const User = mongoose.model('User', schema);

module.exports = User;