const fs = require('fs');
const path = require('path');
const fsPromise = fs.promises;

const contactsPath = path.join(__dirname, 'db/db.json');

async function listContacts() {
  try {
    const contacts = await fsPromise.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    throw new Error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.filter(contact => contact.id === +contactId);
    return findContact;
  } catch (error) {
    throw new Error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      contact => contact.id !== +contactId,
    );
    return filteredContacts;
  } catch (error) {
    throw new Error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const withAddContacts = JSON.stringify([
      ...contacts,
      { id: contacts.length + 10, name: name, email: email, phone: phone },
    ]);
    await fsPromise.writeFile(contactsPath, withAddContacts);
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
}

// listContacts();
// getContactById(3);
// removeContact(3);
// addContact('Tom', 'email@getMaxListeners.com', '0500777417');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
