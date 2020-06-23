import React from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/organism';
import { AddExpenseDialog } from '../../components/molecules';
import './Categories.css';



function Categories (props) {
    
    return (<LoggedTemplate 
            {...props} 
            title='Categorias'
            >
                <ListCategories {...props}/>
                <div className="floating-button-align">
                    <AddExpenseDialog />
                </div>
            </LoggedTemplate>
        )
    
    
}

export default Categories;