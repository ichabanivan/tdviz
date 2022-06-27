
import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';

import config from '../constants/config';
import * as ROUTES from '../constants/routes';

interface GuardedRouteProps {
  children: React.ReactElement
  isAvailable: boolean
}

const GuardedRoute = memo<GuardedRouteProps>(
  ({ children, isAvailable }) => (config.DEBUG || isAvailable)
    ? children
    : <Navigate to={ROUTES.PAGE404.LINK()} />
);

export default GuardedRoute;
