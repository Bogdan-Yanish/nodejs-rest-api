const contactOperations = require('../models/contacts');

// let contacts = [
//     {
//         "id": "1",
//         "name": "Allen Raymond",
//         "email": "nulla.ante@vestibul.co.uk",
//         "phone": "(992) 914-3792"
//       },
//       {
//         "id": "2",
//         "name": "Chaim Lewis",
//         "email": "dui.in@egetlacus.ca",
//         "phone": "(294) 840-6685"
//       },
//       {
//         "id": "3",
//         "name": "Kennedy Lane",
//         "email": "mattis.Cras@nonenimMauris.net",
//         "phone": "(542) 451-7038"
//       },
// ];

const listContacts = async (req, res) => {
    try {
        const contacts = contactOperations.listAllContacts();
        res.status(200).json({contacts});
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
        const updatedContact = await contactOperations.updateContact(body, contactId);
        // if(!updateContact) {
        //     const error = new Error('Not found');
        //     error.status = 404;
        //     throw error;
        // } 
        res.status(200).json(updatedContact);
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