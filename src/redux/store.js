import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filtersSlice';

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'], // only "items" will be persisted in localStorage
};

// persist (save) the contacts.items (via contactsPersistConfig config) to localStorage using contacts reducer
const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer, // new reducer for contacts (using persist to the localStorage)
    filters: filtersReducer, // usual filters reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
