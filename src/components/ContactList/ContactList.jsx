import React from 'react';
import style from './ContactList.module.css'

function ContactList({ contactsList, deleteContact }) {

  return (

    <div>
      <ul>
        {contactsList.map(({ id, name, number }) => {
          return (
            <li key={id} className={style.contact_item}>
              {name}: {number}
              <button type='button' onClick={()=>{deleteContact(id)}}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContactList;
