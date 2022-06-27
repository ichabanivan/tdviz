import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { AppContext } from '../services/app.context';

import { App } from './app';
import { Auth } from './auth';


export const Root = () => {
  const { auth } = useContext(AppContext);
  return (
    <Routes>
      <Route path={`${ROUTES.LAYOUT_APP}/*`} element={<App />} />
      <Route path={`${ROUTES.LAYOUT_AUTH}/*`} element={<Auth />} />
      <Route path="/*" element={<Navigate to={auth ? ROUTES.LAYOUT_APP : ROUTES.LAYOUT_AUTH} />} />
    </Routes>
  );
};

