const User = require('../models/user');
const customeError = require('../helpers/customeError');


module.exports = async (req,res,next)=>{

        const token = req.headers.authorization;
        req.body;
        if(!token) throw customeError(401, 'Authoraization Failed !!')
        currentUser = await User.getUserfromToken(token)

        req.user = currentUser;
        next();

} 