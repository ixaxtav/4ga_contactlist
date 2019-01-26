/* global fetch */ 
import Flux from "@4geeksacademy/react-flux-dash";

export const addContact = (contact) => {
    let contacts = store.getState("contacts");
    if(!contacts) contacts = [contact];
    else contacts.push(contact);
    Flux.dispatchEvent('contacts', contacts);
};

export const deleteContact = (contact) => {
    let contacts = store.getState("contacts");
    const newContactsList = contacts.filter((c) => (c.id != contact.id));
    Flux.dispatchEvent('contacts', newContactsList);
};

export const editContact = (contact) => {
    let contacts = store.getState("contacts");
    const newContactsList = contacts.map((c) => {
        if(c.id == contact.id) return contact;
        return c;
    });
    Flux.dispatchEvent('contacts', newContactsList);
};

export const getAllContacts = () => {
    fetch('http://contact-list-all-ixaxtav.c9users.io:8081/api/contacts/')
      .then(function(response) {
        console.log("Status Response", response.status);
        return response.json();
      })
      .then(function(incomingObject) {
        Flux.dispatchEvent('contacts', incomingObject);
        console.log(incomingObject);
      })
      .catch(function(error){
        console.log("Error", error);
      });
};

class MyStore extends Flux.DashStore {
    constructor(){
        super();
        this.addEvent('contacts', (data) => {
            //transform the data
            if(!Array.isArray(data)) return data;
            const contacts = data.map((c,i) => {
                c.id = i;
                return c;
            });
            return contacts;
        });
    }
}

export const store = new MyStore();