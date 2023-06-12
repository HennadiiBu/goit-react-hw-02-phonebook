import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(elem => elem.id !== contactId),
    });
  };


findContact=(name)=>{
  this.setState({
    contacts:this.state.contacts.filter(elem=>elem.name.toLowerCase().includes(name.trim().toLowerCase()))
  })
};

  render() {
    return (
      <div >
        {' '}
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter findContact={this.findContact}/>
        <ContactList
          contactsList={this.state.contacts}
          deleteContact={this.deleteContact}
        />
        <ToastContainer />
      </div>
    );
  }
}
