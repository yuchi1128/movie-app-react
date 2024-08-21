import React from 'react';
import './App.css';

import theme from './them/theme';
import { ThemeProvider } from '@emotion/react';

import NavBar from './components/NavBar';
import ApiContextProvider from './context/ApiContext'
import Main from './components/Main';


function App() {
  return (
    <ApiContextProvider>
      <ThemeProvider theme={theme}>
        <div>
          <NavBar />
          <Main />
        </div>
      </ThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
