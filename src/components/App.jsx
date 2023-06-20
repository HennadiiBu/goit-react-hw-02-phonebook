import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const load = () => {
  try {
    const serializedState = localStorage.getItem('contacts');
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export class App extends Component {
  state = {
    contacts: load() === undefined ? [] : load(),
    filter: '',
    name: '',
    number: '',
  };

  addNewContact = contact => {
    const newContact = { ...contact, id: nanoid() };

    const isDublicated = this.state.contacts.some(
      elem => elem.name === newContact.name
    );
    if (isDublicated) {
      return toast.error('Contact is alredy exsist');
    }

    localStorage.setItem(`contacts`, JSON.stringify(newContact));

    const parseData = JSON.parse(localStorage.getItem(`contacts`));

    this.setState({
      contacts: [...this.state.contacts, parseData],
    });
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(elem => elem.id !== contactId),
    });
  };

  findContact = name => {
    this.setState({
      contacts: this.state.contacts.filter(elem =>
        elem.name.toLowerCase().includes(name.trim().toLowerCase())
      ),
    });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter findContact={this.findContact} />

        <ContactList
          contactsList={this.state.contacts}
          deleteContact={this.deleteContact}
        />
        <ToastContainer />
        {localStorage.setItem(`contacts`, JSON.stringify(this.state.contacts))}
      </div>
    );
  }
}
