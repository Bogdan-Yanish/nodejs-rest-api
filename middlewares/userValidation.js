const Joi = require('joi');

const userRegisterValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        password: Joi.string().min(6).required(),

        subscription: Joi.string().valid("starter", "pro", "business"),
    })

    const { error } = schema.validate(req.body);
    if (error){
        error.status = 400;
        next(error);
    }

    next();
};

const userLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(req.body);
    if (error){
        error.status = 400;
        next(error);
    }

    next();
};

module.exports = {
    userRegisterValidation,
    userLoginValidation
}






