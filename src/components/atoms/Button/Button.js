import React from 'react';
import Button from '@material-ui/core/Button';
import './Button.css';

  

export default function ContainedButtons(props) {
  
 
    return (
            <Button type={props.type} className={props.className} onClick={ props.onClick }>
                {props.children}
            </Button>
    );
}