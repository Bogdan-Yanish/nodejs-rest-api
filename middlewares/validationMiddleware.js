const Joi = require('joi');

const contactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    
        phone: Joi.string()
            .required(),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error){
        return res.status(400).json({message: "missing required name field"});
    }

    next();
};

const contactBodyValidation = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing fields' });
    }
  
    next();
  };

module.exports = {
    contactValidation,
    contactBodyValidation
}






