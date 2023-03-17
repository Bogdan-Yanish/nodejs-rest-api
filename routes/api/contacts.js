const express = require('express')

const router = express.Router()

const {listContacts, getById, addContact, removeContact, updateContact } = require('../../controllers/contactsControllers');
const { addContactValidation, bodyContactValidation } = require('../../middlewares/validationMiddleware');

router.get('/', listContacts);

router.get('/:contactId', getById);

router.post('/', addContactValidation, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', bodyContactValidation, updateContact);

module.exports = router
