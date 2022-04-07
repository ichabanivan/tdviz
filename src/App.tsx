import React from 'react';
import { ThemeProvider } from '@mui/material';

import { Root } from './layouts';
import { theme } from './styles/theme';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ height: '100vh' }}>
        <Root />
      </div>
    </ThemeProvider>
  );
}

export default App;
