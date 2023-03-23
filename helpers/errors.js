// const { isValidObjectId } = require("mongoose");

// const idValidation = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     const error = new Error('No correct ID');
//     error.status = 404;
//     next(error);
//   }
//   next();
// };

const { isExistContact } = require('../models/contacts');

const idValidation = async (req, res, next) => {
    const { contactId } = req.params;        
    const contactIsExist = await isExistContact(contactId);

    if(contactIsExist){
        return next();
    }
    return res.status(404).json({message: "Not found"})
};

module.exports = {
    idValidation
}