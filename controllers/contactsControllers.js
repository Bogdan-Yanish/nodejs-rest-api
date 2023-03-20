const contactOperations = require('../models/contacts');

const listContacts = async (_, res) => {
    res.status(200).json(await contactOperations.listAllContacts());
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    
    if(!contact) {
        res.status(404).json({message:"Not found"});
    } else {
        res.status(200).json(contact);
    }
    
};

const addContact = async (req, res) => {
    const { body } = req;
    const addedContact = await contactOperations.addNewContact(body);
    res.status(201).json(addedContact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    await contactOperations.removeContact(contactId);
    res.status(200).json({message:"Contact deleted!"});  
};

const updateContact = async (req, res) => {
    
    const { contactId } = req.params;
    const { body } = req;

    const updateContact = await contactOperations.updateContact(contactId, body);
    if (!updateContact) {
        return res.status(404).json({message: "Not Found!"});
    }
    res.status(200).json(updateContact);
};

const updateStatusContact = async (req, res) => {
    
    const { contactId } = req.params;
    const { body } = req;

    const updateContactStatus = await contactOperations.updateContactFavorite(contactId, body);
    if (!updateContact) {
        return res.status(404).json({message: "Not Found!"});
    }
    res.status(200).json(updateContactStatus);
};

module.exports = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
};