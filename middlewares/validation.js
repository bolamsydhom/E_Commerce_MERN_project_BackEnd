const{ validationResult } = require('express-validator');
const customeError = require('../helpers/customeError');
require('express-async-errors');

module.exports = (...validationChecks) => async (req, res, next) => {

        await Promise.all(validationChecks.map(v => v.run(req)));
        const {errors} = validationResult(req);
        if (!errors.length) {
            return next()
        }
        throw customeError(422,'validation Error',errors)

}