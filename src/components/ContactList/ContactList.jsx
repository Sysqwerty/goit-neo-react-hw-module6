import { useSelector } from 'react-redux';
import { selectContacts } from '@redux/contactsSlice';
import { selectNameFilter } from '@redux/filtersSlice';
import Contact from '@components/Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.contacts}>
      {visibleContacts.map(contact => (
        <Contact key={contact.id} {...contact} />
      ))}
    </ul>
  );
};

export default ContactList;
