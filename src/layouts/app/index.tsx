import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { AppContext } from '../../services/app.context';

import { Layout } from './layout';
import { System } from './system';

export const App = () => {
  const location = useLocation();
  const { auth } = useContext(AppContext);
  if (!auth) { return <Navigate to={ROUTES.SIGN_IN.LINK()} replace state={{ from: location }} />; }
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.SYSTEM.ROUTE_RELATIVE_DEEP} element={<System />} />
        <Route path="/*" element={<Navigate replace to={ROUTES.SYSTEM.LINK()} />} />
      </Routes>
    </Layout>
  );
};
