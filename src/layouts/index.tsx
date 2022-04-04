import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import { App } from './app';
import { Auth } from './auth';

export const Root = () => {
  const initialized = true;
  const health = true;
  const auth = !false;
  if (!health) {
    return <span>Site is under Maintenance</span>;
  }
  if (!initialized) {
    return <span>Preloader</span>;
  }
  return <BrowserRouter>
    <Routes>
      <Route path={`${ROUTES.LAYOUT_APP}/*`} element={<App />} />
      <Route path={`${ROUTES.LAYOUT_AUTH}/*`} element={<Auth />} />
      <Route path="/*" element={<Navigate to={auth ? ROUTES.LAYOUT_APP : ROUTES.LAYOUT_AUTH} />} />
    </Routes>
  </BrowserRouter>;
};

