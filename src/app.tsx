import React from 'react';
import { ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';


import client from '~apollo/client';

import { theme } from '~styles/theme';

import { Root } from './layouts';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <div className="App" style={{ height: '100vh' }}>
          <Root />
        </div>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
