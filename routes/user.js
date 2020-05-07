const express = require('express');
const Users = require('../models/user');
const Products = require('../models/product');
const authnticationMiddleware = require('../middlewares/authentication');
const router = express.Router();



router.get('/', authnticationMiddleware, async (req, res, next) => {
    try {
        const users = await Users.find({}, {
            firstName: 1,
            _id: 0

        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
})


router.post('/register', async (req, res, next) => {
    try {

        const {
            email,
            password,
            repeatedPassword
        } = req.body;
        const user = new Users({
            email,
            password
        });
        if (password !== repeatedPassword) {
            
            throw new Error('Password didnot Match');
        }
        await user.save();
        res.status(200).json(`s`);
        // return res.redirect('http://localhost:3000/product');
    } catch (err) {
        err.statusCode = 422;
        next(err);
    }

})


router.post('/login', async (req, res, next) => {


    if (!req.body.email || !req.body.password) {
        res.status(422).send(`${!req.body.email? 'email' : 'password' } is required`);


    } else {
        try {
            const {
                email,
                password
            } = req.body;
            const person = await Users.findOne({
                email
            });
            // .populate('products').exec();
            if (!person) {
                throw new Error('Try Again!! wrong email or password')
            } else {
                const isValidPerson = await person.comparePassword(password);
                if (isValidPerson) {
                    const token = await person.generateToken();
                    res.status(200).json({
                        person,
                        token
                    });
                } else {
                    throw new Error('Try Again!! wrong email or password')
                }
            }
        } catch (err) {
            err.statusCode = 422;
            next(err);
        }

    }




})


router.delete('/', authnticationMiddleware, async (req, res, next) => {
    try {
        await Users.findByIdAndRemove({
            _id: req.user.id
        });
        res.status(200).json("Deleted Successfuly");
    } catch (err) {
        next(err);
    }
})



router.patch('/', authnticationMiddleware, async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await Users.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            omitUndefined: true
        });
        res.status(200).json(`${user}updated Successfuly`);
    } catch (err) {
        next(err);
    }
})

module.exports = router;