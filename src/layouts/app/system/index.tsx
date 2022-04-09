import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '~constants/routes';

import { Users } from './users';

export const System = () => {
  return (
    <Routes>
      <Route path={ROUTES.USERS.ROUTE_RELATIVE_DEEP} element={<Users />} />
      <Route path="/*" element={<Navigate replace to={ROUTES.USERS.LINK()} />} />
    </Routes>
  );
};
