const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "/contacts.json");

const listAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);
    return contact;
};

const removeContact = async (contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filterContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
}

const addNewContact = async (body) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {id:v4(), ...body};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    // if (contactIndex === -1) {
    //     return null;
    // }

    const { name, email, phone} = body;
    // const [contact] =contacts.filter(item => item.id === contactId);
    // contact.name = name;
    // contact.email = email;
    // contact.phone = phone;

    contacts.forEach(contact => {
        if(contact.id === contactId) {
            contact.name = name;
            contact.email = email;
            contact.phone = phone;
        }
    });

   

    // contacts[contactIndex] = {...body, id: contactId};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    // return contacts[contactIndex];
    
}

module.exports = {
  listAllContacts,
  getContactById,
  removeContact,
  addNewContact,
  updateContact,
}
