const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "./contacts.json");

const listAllContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.log(error.message);
    }
    
};

const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(contact => contact.id === contactId);
        return contact;
    } catch (error) {
        console.log(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const indexContact = contacts.findIndex(contact => contact.id === contactId);
        
        if(indexContact === -1) {
        return null;
        }

        const contactToDelete = contacts.splice(indexContact, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return contactToDelete;
    } catch (error) {
        console.log(error.message);
    }
    
};

const addNewContact = async (body) => {
    try {
        const data = await fs.readFile(contactsPath);
        const newContact = {id:v4(), ...body};
        const contacts = JSON.parse(data);
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

const updateContact = async (contactId, body) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const indexContact = contacts.findIndex((contact) => contact.id === contactId);
  
        if (indexContact === -1) {
            return null;
        }
  
        contacts[indexContact] = { ...contacts[indexContact], ...body };
  
        fs.writeFile(contactsPath, JSON.stringify(contacts));
  
        return contacts[indexContact];
    } catch (error) {
        console.log(error.message);
    }
};



module.exports = {
  listAllContacts,
  getContactById,
  removeContact,
  addNewContact,
  updateContact,
}
