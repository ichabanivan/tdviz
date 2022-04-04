import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import { SignUp } from './sign-up';
import { SignIn } from './sign-in';

export const Auth = () => <Routes>
  <Route path={ROUTES.SIGN_UP.ROUTE_RELATIVE} element={<SignUp />} />
  <Route path={ROUTES.SIGN_IN.ROUTE_RELATIVE} element={<SignIn />} />
  <Route path="/*" element={<Navigate to={ROUTES.SIGN_IN.LINK()} />} />
</Routes>;

