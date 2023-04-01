// const Contact = require('../models/contactSchema');

// const listAllContacts = async () => {
//     try {
//         const contacts = await Contact.find();
//         return contacts;
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const getContactById = async (contactId) => {
//     try {
//         const contact = await Contact.findById(contactId);
//         return contact;
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const removeContact = async (contactId) => {
//     try {
//         await Contact.findByIdAndDelete(contactId);
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const addNewContact = async (body) => {
//     try {
//         const newContact = await Contact.create(body);
//         return newContact;
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const updateContact = async (contactId, body) => {
//     try {
//         const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId}, body, {new: true});
//         return updatedContact;
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const updateContactFavorite = async (contactId, body) => {
//     try {
//         const { favorite } = body;
//         const contact = await Contact.findByIdAndUpdate({ _id: contactId}, {favorite}, {new: true});
//         return contact;
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// const isExistContact = async(contactId) => {
//     try {
//         return await Contact.exists({_id: contactId});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// module.exports = {
//     isExistContact
    
// }
