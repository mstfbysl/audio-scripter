import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';
import { NotesProvider } from './context/NotesContext';

import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import Settings from './pages/Settings';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NotesProvider>
      <CSSReset />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<WelcomePage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </Router>
      </NotesProvider>
    </ChakraProvider>
  );
}

export default App;
