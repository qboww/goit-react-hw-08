import { useDispatch } from 'react-redux';

import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';

import { fetchContactsThunk } from '../../redux/contacts/operations';
import { useEffect } from 'react';

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  
  return (
    <div className="container">
      <div className="card">
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
};

export default ContactsPage;
