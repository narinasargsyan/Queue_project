const Validator = require("fastest-validator");
const userValidation = require('../schema/userValidator');
const v = new Validator();

const registerMiddleware = async (req,res,next) => {
    const validate = v.compile(userValidation.schema);
    const result = validate(req.body);
    if(Array.isArray(result)) {
        return res.status(409).json(result)
    }
    next()
}

module.exports = registerMiddleware;