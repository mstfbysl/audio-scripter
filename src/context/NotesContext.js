import React, { createContext, useState, useContext } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState('');

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <NotesContext.Provider value={{ notes, handleNotesChange }}>
      {children}
    </NotesContext.Provider>
  );
};
