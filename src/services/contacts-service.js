export default class ContactsService {
  BASE_URL = 'http://localhost:5000/contacts';

  contactsRequest = async (username) => {
    const res = await fetch(`${this.BASE_URL}?owner=${username}`);

    return new Promise(async (resolve, reject) => {
      if (res.ok) {
        resolve(await res.json());
      }

      reject(new Error(`Could not fetch contacts, received ${res.status}`));
    });
  };

  addContact = async (contact) => {
    if (!contact) {
      return false;
    }

    const res = await fetch(`${this.BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (await res.ok) {
      return res.json();
    }
  };

  removeContact = async (id) => {
    const res = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (await res.ok) {
      return true;
    } else {
      return false;
    }
  };

  editContact = async (contact) => {
    const res = await fetch(`${this.BASE_URL}/${contact.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (await res.ok) {
      return true;
    } else {
      return false;
    }
  };
}
