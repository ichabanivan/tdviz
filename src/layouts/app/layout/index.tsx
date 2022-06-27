import { useNavigate } from 'react-router-dom';
import React, { memo, ReactNode, useCallback, useState } from 'react';
import { Box, Toolbar, List, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import _ from '../../../services/lodash';
import logoSvg from '../../../assets/logo-white.svg';
import { ChevronRightIcon, MenuIcon } from '../../../components/icons';

import { useLayouts } from './layouts';
import { UserMenu } from './user-menu';
import { AppBarStyled, DRAWER_WIDTH, DrawerStyled, HeaderStyled } from './styles';


interface LayoutProps {
  children: ReactNode
}

export const Layout = memo<LayoutProps>(({ children }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const layouts = useLayouts();

  const layout = _.find(layouts, { id: 'system' });

  return (
    <>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleOpen}
            sx={{ mr: 4, display: open ? 'none' : 'flex' }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexGrow: { xs: 1, md: 0 } }}>
            <img width="180" src={logoSvg} alt="Logo Save Health" />
          </Box>
          <Box sx={{ flexGrow: 0, ml: 'auto' }}>
            <UserMenu user={{}} menu={[{ id: 1, title: 'Profile' }]} />
          </Box>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent" open={open}>
        <HeaderStyled>
          <IconButton onClick={handleClose}>
            <ChevronRightIcon />
          </IconButton>
        </HeaderStyled>
        <Divider />
        <List>
          { layout?.list?.map(({ id, title, link, Icon }) => (
            <ListItemButton key={id} onClick={() => navigate(link)}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 4 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          )) }
        </List>
      </DrawerStyled>
      <Box component="main">
        <HeaderStyled />
        <Box sx={{ flexGrow: 1, ml: open ? `${DRAWER_WIDTH}px` : '57px', }}>
          { children }
        </Box>
      </Box>
    </>
  );
});
