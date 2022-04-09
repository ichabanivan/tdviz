import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Paper, Slide, ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import client from '~apollo/client';

import '~services/i18n';

import { theme } from '~styles/theme';

import { Root } from './layouts';

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
