const Joi = require('joi');

const addContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        phone: Joi.string().required(),

        favorite: Joi.boolean(),
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
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: 'missing fields' });
    }

    next();
};

const contactStatusValidation = (req, res, next) => {
    const schema = Joi.object({ favorite: Joi.boolean().required() });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
        console.log(error);
        return res.status(400).json({message: "missing field favorite"});
    }
    
    next();
};

module.exports = {
    addContactValidation,
    bodyContactValidation,
    contactStatusValidation,    
}






