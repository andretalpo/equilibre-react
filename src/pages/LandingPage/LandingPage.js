import React from 'react';

import './LandingPage.css';

//Components Material-UI
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//Images&Logos
import logo from '../../assets/images/logo8.png';
import pic1 from '../../assets/images/landingPage-1.jpg';
import grid1 from '../../assets/images/grid1.jpg';
import grid2 from '../../assets/images/grid2.jpg';
import grid3 from '../../assets/images/grid3.jpg';
import grid4 from '../../assets/images/grid4.jpg';
import appleGoogleStoreLogo from '../../assets/images/app-store-google.png';


// const StyledBreadcrumb = withStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.grey[100],
//     height: theme.spacing(3),
//     color: theme.palette.grey[800],
//     fontWeight: theme.typography.fontWeightRegular,
//     maxWidth: 'lg',
//     '&:hover, &:focus': {
//       backgroundColor: theme.palette.grey[300],
//     },
//     '&:active': {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(theme.palette.grey[300], 0.12),
//     },
//   },
// }))(Chip);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
  },
}));


export default function LandingPage({...props}) {

  const classes = useStyles();

 
  return (
        <div>
             <div className="navbar">
                <img src={logo} alt='logo'></img>
                <div >
                  <Button className="button-primary button-align" onClick={value => props.history.push('/login')}>
                    LOGIN
                  </Button>
                  <Button className="button-secondary button-align" onClick={value => props.history.push('/signup')}>
                    Sign Up
                  </Button>
                </div>

       
            </div>
            <div className="first-section">
                <div className="first-section-left-div">
                        <h1>As despesas do seu cartão no seu controle</h1>
                        <ul>A forma inteligente de acompanhar os seus gastos
                          <li>Primeiro Item</li>
                          <li>Segundo Item</li>
                          <li>Terciro Item</li>
                        </ul>
                        <Button
                            className="button"
                            variant="contained"
                            color="primary"
                            onClick={ value => props.history.push('/signup')}
                        >
                            Descubra como
                        </Button>

                </div>
             </div>
            <div >
              <div >
                <Grid container spacing={4} className="second-section grid-container">
                  <Grid item xs={2} className="grid">
                    <Paper className={classes.paper}>
                      <img src={grid1} alt={`pic-${grid1}`} ></img> 
                      <p>Lorem Ipsum </p>
                    </Paper>
                  </Grid>
                  <Grid item xs={2} className="grid">
                    <Paper className={classes.paper}>
                      <img src={grid2} alt={`pic-${grid2}`} ></img>
                      <p>É um fato conhecido de todos </p>
                    </Paper>
                  </Grid>
                  <Grid item xs={2} className="grid">
                    <Paper className={classes.paper}>
                    <img src={grid3} alt={`pic-${grid3}`} ></img>
                    <p>Existem muitas variações </p>
                    </Paper>
                  </Grid>
                  <Grid item xs={2} className="grid">
                    <Paper className={classes.paper}>
                      <img src={grid4} alt={`pic-${grid4}`} ></img>
                      <p>Ele usa um dicionário  </p>
                    </Paper>
                  </Grid>
                </Grid>
 
              </div>
            <div className="third-section">
                <div className="third-section-first-container">
                  <h1>Em breve, disponivel para as plataformas abaixo:</h1>
                  <div className="third-section-second-container">
                    <img src={appleGoogleStoreLogo} alt={`AppleGoogleStoreLogo`} ></img>
                </div>
                </div>
                
            </div>
        </div>
      </div>
       

  );
}
