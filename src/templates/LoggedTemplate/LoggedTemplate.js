import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './LoggedTemplate.css';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const drawerWidth = 265;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      padding: '15px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: 'url(/images/market.jpg)',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: '#fafafa',
  },
  divider: {
    backgroundColor: '#fafafa'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItem: {
    padding: '15px'
  },
  title: {
    flexGrow: 1,
  }
}));

function ResponsiveDrawer(props) {
  const { window, history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>EQUILIBRE</Typography>
      </Box>
      <Divider classes={{ root: classes.divider }} variant="middle" />
      <List>
        <ListItem classes={{ root: classes.listItem }} button onClick={() => history.push('/dashboard')}>
          <ListItemIcon><DashboardIcon color="secondary" /></ListItemIcon>
          <ListItemText color="secondary" primary="Dashboard" />
        </ListItem>
        <ListItem classes={{ root: classes.listItem }} button onClick={() => history.push('/cards')}>
          <ListItemIcon><CreditCardIcon color="secondary" /></ListItemIcon>
          <ListItemText primary="Cartões" />
        </ListItem>
        <ListItem classes={{ root: classes.listItem }} button onClick={() => history.push('/expenses')}>
          <ListItemIcon><AttachMoneyIcon color="secondary" /></ListItemIcon>
          <ListItemText primary="Compras" />
        </ListItem>
        <ListItem classes={{ root: classes.listItem }} button onClick={() => history.push('/categories')}>
          <ListItemIcon><CategoryIcon color="secondary" /></ListItemIcon>
          <ListItemText primary="Categorias" />
        </ListItem>
      </List>
      <Divider classes={{ root: classes.divider }} variant="middle" />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar elevation={0} color="transparent" position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
        </Typography>
          <IconButton
            color="inherit"
            edge="end"
            aria-label="logout"
            onClick={handleDrawerToggle}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true, }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper, }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          {props.children}
        </Container>
      </main>
    </div>
  );
}

export default ResponsiveDrawer;