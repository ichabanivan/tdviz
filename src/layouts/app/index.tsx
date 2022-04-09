import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '~constants/routes';

import { Layout } from '~layouts/app/layout';

import { System } from './system';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.SYSTEM.ROUTE_RELATIVE_DEEP} element={<System />} />
        <Route path="/*" element={<Navigate replace to={ROUTES.SYSTEM.LINK()} />} />
      </Routes>
    </Layout>
  );
};
