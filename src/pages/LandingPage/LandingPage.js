import React from 'react';

import './LandingPage.css';

//Components Material-UI
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//Images&Logos
import logo from '../../assets/images/logo8.png';
import grid1 from '../../assets/images/grid1.jpg';
import grid2 from '../../assets/images/grid2.jpg';
import grid3 from '../../assets/images/grid3.jpg';
import grid4 from '../../assets/images/grid4.jpg';
import appleGoogleStoreLogo from '../../assets/images/app-store-google.png';



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
                <div className="first-section-div">
                        <Button
                            className="button"
                            variant="contained"
                            color="secondary"
                            onClick={ value => props.history.push('/signup')}
                        >
                            Descubra como
                        </Button>

                </div>
             </div>
            <div className="second-section-div">
              <h1>Porque usar o Equilibre?</h1>
              <div className="second-section-grid">
                <div className="grid-img-container">
                  <img src={grid1} alt='grid1'></img>
                  <p>Aplicativo fácil e intuitivo</p>
                </div>
                <div className="grid-img-container">
                  <img src={grid2} alt='grid2'></img>
                  <p>Categorize seus gastos para um melhor controle</p>
                </div>
                <div className="grid-img-container">
                  <img src={grid3} alt='grid3'></img>
                  <p>Entenda para onde está indo o seu dinheiro todo mês</p>
                </div>
                <div className="grid-img-container">
                  <img src={grid4} alt='grid4'></img>
                  <p>Viva tranquilo e sem surpresas no seu cartão</p>
                </div>
              </div>
           
           
            <div className="third-section">
                <div className="third-section-first-container">
                  <h2>Em breve<br/>disponivel para as plataformas abaixo:</h2>
                  <div className="third-section-second-container">
                    <img src={appleGoogleStoreLogo} alt={`AppleGoogleStoreLogo`} ></img>
                  </div>
                </div>
                
            </div>
        </div>
      </div>
       

  );
}
