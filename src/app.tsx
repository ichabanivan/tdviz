import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { IconButton, ThemeProvider } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { I18nextProvider, useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { Root } from './layouts';
import client from './apollo/client';
import { theme } from './styles/theme';
import AuthService from './services/auth';
import { CloseIcon } from './components/icons';
import { Preloader } from './components/preloader';
import i18n, { ITranslation } from './services/i18n';
import { Maintenance } from './components/maintenance';
import { AppContext, IAppContext, initial } from './services/app.context';
import { ServiceStatus, useHealthQuery, useMeQuery } from './apollo/graphql';

export const App = () => {
  return (
    <Provider>
      <AppProvider>
        <Root />
      </AppProvider>
    </Provider>
  );
};

interface ProviderProps {
  children: React.ReactNode
}

export const Provider = memo<ProviderProps>(({ children }) => {
  const ref = React.createRef<SnackbarProvider>();
  const handleDismiss = useCallback((key: SnackbarKey) => () => {
    ref.current?.closeSnackbar(key);
  }, [ref]);
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <SnackbarProvider
            ref={ref}
            maxSnack={5}
            preventDuplicate
            hideIconVariant={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            action={(key) => (
              <IconButton
                onClick={handleDismiss(key)}
              >
                <CloseIcon />
              </IconButton>
            )}
          >
            <BrowserRouter>
              { children }
            </BrowserRouter>
          </SnackbarProvider>
        </ApolloProvider>
      </ThemeProvider>
    </I18nextProvider>

  );
});

export const AppProvider = memo<ProviderProps>(({ children }) => {
  const { t } : ITranslation = useTranslation();
  const [ctrl, setCtrl] = useState<IAppContext>(initial);
  const updateCtrl = useCallback((data: Partial<IAppContext>) => setCtrl(ctrl => ({ ...ctrl, ...data })), []);
  const isTokenExist = AuthService.isTokenExist();

  const { refetch, loading } = useHealthQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ health }) => {
      updateCtrl({
        auth: false,
        initialized: !isTokenExist,
        health: [
          health?.appConnection,
          health?.databaseConnection,
          health?.internetConnection,
        ]
          .every(status => status === ServiceStatus.Up)
      });
    },
    onError: () => {
      updateCtrl({
        auth: false,
        initialized: !isTokenExist,
      });
    }
  });


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!ctrl.health) {
      timer = setInterval(async () => {
        try {
          await refetch();
          console.warn(t('system.maintenance.available'));
        } catch ({ message }) {
          console.warn(t('system.maintenance.unavailable'));
        }
      }, 10 * 1000);
    }
    return () => clearInterval(timer);
  }, [ctrl.health, refetch, t]);

  useMeQuery({
    skip: !ctrl.health || !isTokenExist,
    onCompleted: (data) => {
      updateCtrl({
        auth: true,
        initialized: true,
      });
    },
    onError: () => {
      AuthService.removeToken();
      updateCtrl({
        auth: false,
        initialized: true,
      });
    }
  });

  if (!ctrl.initialized) {
    return <Preloader />;
  }
  if (!ctrl.health) {
    return <Maintenance loading={loading} />;
  }
  return (
    <AppContext.Provider
      value={{
        ...ctrl,
        updateCtrl
      }}
    >
      { children }
    </AppContext.Provider>
  );
});
