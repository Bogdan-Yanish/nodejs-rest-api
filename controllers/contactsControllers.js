// const contactOperations = require('../service/contacts');
const Contact = require('../models/contactSchema');

// const listContacts = async (req, res) => {
//     // res.status(200).json(await contactOperations.listAllContacts());
//     const {_id} = req.user;
//     const allContacts = await Contact.find({owner: _id})
//     res.status(200).json(allContacts);
// };

const listContacts = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
  
    const queryParams = favorite ? { owner: _id, favorite } : { owner: _id };
    const allContacts = await Contact.find(queryParams, "", {
      skip,
      limit: +limit,
    }).populate("owner", "_id email");
    res.status(200).json(allContacts);
  };

const getById = async (req, res) => {
    const { contactId } = req.params;
    // const contact = await contactOperations.getContactById(contactId);
    const contact = await Contact.findById(contactId);
    res.status(200).json(contact);
};

const addContact = async (req, res) => {
    const {_id } = req.user;
    const { body } = req;
    // const addedContact = await contactOperations.addNewContact(body);
    const newContact = await Contact.create({...body, owner: _id});
    res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({message:"Contact deleted!"});  
};

const updateContact = async (req, res) => {
    
    const { contactId } = req.params;
    const { body } = req;

    const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId}, body, {new: true});
    res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
    
    const { contactId } = req.params;
    const { favorite } = req.body;

    const updateContactStatus = await Contact.findByIdAndUpdate({contactId}, {favorite}, {new: true});
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