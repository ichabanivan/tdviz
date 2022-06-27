import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Card, CardMedia, Grid, Divider } from '@mui/material';

import logoSvg from '../../assets/logo.svg';
import { bg } from '../../assets/cloudinary';
import * as ROUTES from '../../constants/routes';

import { SignUp } from './sign-up';
import { SignIn } from './sign-in';

export const Auth = () => (
  <Grid container minHeight="100vh" p={2} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
    <Grid item xs={12} md={6} lg={4} m="auto">
      <Card>
        <CardMedia
          component="img"
          image={logoSvg}
          alt="Logo Save Health"
          style={{ width: 280, margin: '20px auto' }}
        />
        <Divider />
        <Routes>
          <Route path={ROUTES.SIGN_UP.ROUTE_RELATIVE} element={<SignUp />} />
          <Route path={ROUTES.SIGN_IN.ROUTE_RELATIVE} element={<SignIn />} />
          <Route path="/*" element={<Navigate to={ROUTES.SIGN_IN.LINK()} />} />
        </Routes>
      </Card>
    </Grid>
  </Grid>
);

