import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useContext, useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

import AuthService from '../../../services/auth';
import { ITranslation } from '../../../services/i18n';
import { AppContext } from '../../../services/app.context';

interface UserMenuProps {
  user: any // TODO
  menu: Array<any> // TODO
}

export const UserMenu = memo<UserMenuProps>(({ user, menu }) => {
  const { t } : ITranslation = useTranslation();
  const { updateCtrl } = useContext(AppContext);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = useCallback(() => setAnchorUser(null), []);
  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  }, []);

  return (
    <>
      <Tooltip title={t('system.open-menu')}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name} src={user?.image?.url} />
        </IconButton>
      </Tooltip>
      <Menu
        keepMounted
        anchorEl={anchorUser}
        open={Boolean(anchorUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        { menu?.map(({ id, title }) => (
          <MenuItem key={id}>
            <Typography textAlign="center">{ title }</Typography>
          </MenuItem>
        )) }
        <MenuItem onClick={() => AuthService.signOut()}>
          <Typography textAlign="center">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
});
