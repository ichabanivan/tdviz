import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardMedia, Grid, Typography, LinearProgress } from '@mui/material';

import logoSvg from '../assets/logo.svg';
import { bg } from '../assets/cloudinary';
import { ITranslation } from '../services/i18n';
import maintenance from '../assets/maintenance.svg';

interface MaintenanceProps {
  loading: boolean
}

export const Maintenance = memo<MaintenanceProps>(({ loading }) => {
  const { t } : ITranslation = useTranslation();
  return (
    <Grid container minHeight="100vh" p={2} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} data-testid="screen-maintenance">
      <Grid item xs={12} sm={8} md={6} lg={4} m="auto" display="flex" flexDirection="column">
        <img
          src={logoSvg}
          alt="Logo Save Health"
          style={{ width: 280, margin: '20px auto' }}
        />
        <Card>
          <LinearProgress color={loading ? 'error' : 'primary'} />
          <CardMedia
            component="img"
            image={maintenance}
            alt="Logo Save Health"
            style={{ width: '100%' }}
          />
          <CardContent>
            <Typography variant="h1" align="center" sx={{ mb: 4 }}>
              { t('system.maintenance.title') }
            </Typography>
            <Typography variant="subtitle1" align="center">
              { t('system.maintenance.description') }
            </Typography>
            <Typography variant="subtitle1" align="center">
              { t('system.maintenance.footer') }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
