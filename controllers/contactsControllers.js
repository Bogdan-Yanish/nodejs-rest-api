const contactOperations = require('../models/contacts');

const listContacts = async (req, res) => {
    try {
        const contacts = contactOperations.listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const getById = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await contactOperations.getContactById(contactId);
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({message: "Not found"});
    }
};

const addContact = async (req, res) => {
    try {
        const { body } = req;
        const addedContact = await contactOperations.addContact(body);
        res.status(201).json({addedContact});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const removeContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        await contactOperations.removeContact(contactId);

        res.status(200).json({message:"Contact deleted!"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const updateContact = async (req, res) => {
    try {
        const { body } = req;
        const { contactId } = req.params;
        const updatedContact = await contactOperations.updateContact(body, contactId);

        res.status(200).json({updatedContact});
    } catch (error) {
        res.status(404).json({message:"Not found"});
    }
};

module.exports = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
};