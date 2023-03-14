const express = require('express')

const router = express.Router()

const {listContacts, getById, addContact, removeContact, updateContact } = require('../../controllers/contactsControllers');
const { contactValidation } = require('../../middlewares/validationMiddleware');

router.get('/', listContacts);

router.get('/:contactId', getById);

router.post('/', contactValidation, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', contactValidation, updateContact);

module.exports = router
