const Joi = require('joi');

const addContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        phone: Joi.string().required(),
    })

    const { error } = schema.validate(req.body);
    if (error){
        const fieldName = error.details[0].context.key;
        return res.status(400).json({
            message: `missing required ${fieldName} field`});
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
    }).or("name", "email", "phone");

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






