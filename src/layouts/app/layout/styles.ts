import { AppBar, AppBarProps, Box, Drawer } from '@mui/material';
import { CSSObject, styled, Theme } from '@mui/material/styles';

export const DRAWER_WIDTH = 240;

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(11)} + 1px)`,
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const HeaderStyled = styled('div')(({ theme }) => ({
  marginRight: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // NOTE necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    } : {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// export const MainStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open } : { open: boolean, theme: Theme }) => ({
//     // sx={{ flexGrow: 1, maxWidth: "calc(100% - 66px)" }}
//     // maxWidth: DRAWER_WIDTH,
//     ...(open ? {
//       maxWidth: `calc(100% - (${theme.spacing(11)} + 1px))`,
//     } : {
//       maxWidth: `calc(100% - ${DRAWER_WIDTH})`,
//     }),
//   }),
// );

interface IAppBarProps extends AppBarProps {
  open?: boolean;
}

export const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<IAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
