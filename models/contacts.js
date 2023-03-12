const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, '', "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (contactId) => {
    const data = await listContacts();
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);

    if(!contact){
        console.log(`Contact with id "${contactId}" not found!`);
        return;
    } 
    return contact;
};

const removeContact = async (contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filterContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
}

const addContact = async (body) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {id:v4(), ...body};
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex === -1) {
      return null;
    }

    contacts[contactIndex] = {...body, id: contactId};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactIndex];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
