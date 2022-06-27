import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import './services/i18n';
import { Root } from './layouts';
import client from './apollo/client';
import { theme } from './styles/theme';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <SnackbarProvider
          maxSnack={5}
          preventDuplicate
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
