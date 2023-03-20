const express = require('express')

const router = express.Router()

const { listContacts, getById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controllers/contactsControllers');
const { addContactValidation, bodyContactValidation, contactStatusValidation } = require('../../middlewares/validationMiddleware');
const { controllerWrap } = require('../../helpers/controllerWrap');

router.get('/', controllerWrap(listContacts));

router.get('/:contactId',controllerWrap(getById));

router.post('/', addContactValidation, controllerWrap(addContact));

router.delete('/:contactId',controllerWrap(removeContact));

router.put('/:contactId', bodyContactValidation, controllerWrap(updateContact));

router.patch('/:contactId/favorite', contactStatusValidation, controllerWrap(updateStatusContact));


module.exports = router
