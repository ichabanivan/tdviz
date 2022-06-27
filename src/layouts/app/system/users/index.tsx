import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '../../../../constants/routes';

import { List } from './list';
import { Edit } from './edit';

export const Users = () => {
  return (
    <Routes>
      <Route path={ROUTES.USERS_EDIT_TAB.ROUTE_RELATIVE} element={<Edit />} />
      <Route path={ROUTES.USERS_LIST.ROUTE_RELATIVE} element={<List />} />
      <Route path="/*" element={<Navigate to={ROUTES.USERS_LIST.LINK()} />} />
    </Routes>
  );
};
