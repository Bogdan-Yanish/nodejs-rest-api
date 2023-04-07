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
        const fieldName = error.details[0].context.key;
        return res.status(400).json({
            message: `missing required ${fieldName} field`});
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
        const fieldName = error.details[0].context.key;
        return res.status(400).json({
            message: `missing required ${fieldName} field`});
    }

    next();
};

const userStatusValidation = (req, res, next) => {
    const schema = Joi.object({ subscription: Joi.string().valid("starter", "pro", "business")});
  
    const { error } = schema.validate(req.body);
    if (error) {
        error.status = 400;
        next(error);
    }
    
    next();
};

const userEmailValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    })

    const { error } = schema.validate(req.body);
    if (error){
        // const fieldName = error.details[0].context.key;
        return res.status(400).json({
            message: "Only email field is required"});
    }

    next();
};

module.exports = {
    userRegisterValidation,
    userLoginValidation,
    userStatusValidation,
    userEmailValidation
}






