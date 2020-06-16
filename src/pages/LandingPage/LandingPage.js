import React from 'react';

import './LandingPage.css';

//Components Material-UI
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//Images&Logos
import logo from '../../assets/images/logo8-256px.png';
import pic1 from '../../assets/images/landingPage-1.jpg';
import grid1 from '../../assets/images/grid1.jpg';
import grid2 from '../../assets/images/grid2.jpg';
import grid3 from '../../assets/images/grid3.jpg';
import grid4 from '../../assets/images/grid4.jpg';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    maxWidth: 'lg',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function LandingPage({...props}) {

  const classes = useStyles();

 
  return (
        <div>
             <div className="navbar">
                <img src={logo} alt='logo'></img>
                <Breadcrumbs aria-label="breadcrumb" >
                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Login"
                        icon={<HomeIcon fontSize="small" />}
                        onClick={ value => props.history.push('/login') }
                    />
                    <StyledBreadcrumb
                        label="SignUp"
                        onClick={ value => props.history.push('/signup') }
                    />
                </Breadcrumbs>
       
            </div>
            <div className="first-section">
                <div className="first-section-left-div">
                        <h1>As despesas do seu cartão no seu controle</h1>
                        <Button
                            className="button"
                            variant="contained"
                            color="secondary"
                            onClick={ value => props.history.push('/signup')}
                        >
                            Descubre como
                        </Button>

                </div>
                <div className="first-section-right-div">
                    <img src={pic1} alt='pic1'></img>
                </div>
             </div>
            <div >
              <div className={`second-section ${classes.root}`}>
              <Grid container spacing={4}>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <img src={grid1} alt={`pic-${grid1}`} ></img> 
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <img src={grid2} alt={`pic-${grid2}`} ></img>
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                   <img src={grid3} alt={`pic-${grid3}`} ></img>
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>

                    <img src={grid4} alt={`pic-${grid4}`} ></img>
                  </Paper>
                </Grid>
              </Grid>
 
              </div>
            <div className="third-section">

            </div>
        </div>
      </div>
       

  );
}
