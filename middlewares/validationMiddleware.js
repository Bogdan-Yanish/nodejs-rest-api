const Joi = require('joi');

const addContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        phone: Joi.string()
            .alphanum()
            .required(),
    })

    const { error } = schema.validate(req.body);
    if (error){
        return res.status(400).json({
            message: `missing required ${
            error.message.replace(/"/g, "").split(" ", 1)
        } field`});
    }

    next();
};

const bodyContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional(),
        phone:Joi.string().optional(),
    })

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "missing fields",
        })
    }

    next();
}

module.exports = {
    addContactValidation,
    bodyContactValidation  
}






