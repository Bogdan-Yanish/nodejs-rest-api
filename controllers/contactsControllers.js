const contactOperations = require('../models/contacts');

const listContacts = async (_, res) => {
    try {
        const contacts = contactOperations.listAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const getById = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await contactOperations.getContactById(contactId);
        
        if(!contact) {
            const error = new Error('Not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({message: "Not found"});
    }
};

const addContact = async (req, res) => {
    try {
        const { body } = req;
        const addedContact = await contactOperations.addNewContact(body);
        res.status(201).json(addedContact);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const removeContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contactToDelete = await contactOperations.removeContact(contactId);
        res.status(200).json({message:"Contact deleted!"});

        if(!contactToDelete) {
            const error = new Error('Not found');
            error.status = 404;
            throw error;
        }
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const updateContact = async (req, res) => {
    try {
        const { body } = req;
        const { contactId } = req.params;
        
        if (!body) {
            res.status(400).json({ message: "missing fields" });
        } else {
            const updatedContact = await contactOperations.updateContact(body, contactId);
            if(updatedContact) {
                res.status(200).json(updatedContact);
            }
        }
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