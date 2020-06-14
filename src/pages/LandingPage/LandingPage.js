import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import './LandingPage.css';
import { Button } from '@material-ui/core';

import logo from '../../assets/images/logo8-256px.png';
import pic1 from '../../assets/images/landingPage-1.jpg';

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


export default function LandingPage({...props}) {
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
        </div>
       

  );
}
