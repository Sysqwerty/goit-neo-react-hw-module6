import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        if (
          state.items.find(
            ({ name, number }) =>
              name === action.payload.name || number === action.payload.number
          )
        ) {
          iziToast.warning({
            position: 'topRight',
            message: 'This name or number is already exists',
          });
          return;
        }
        state.items.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const selectContacts = state => state.contacts.items;
export const contactsReducer = contactsSlice.reducer;
