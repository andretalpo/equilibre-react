import React, { Component } from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/organism';
import { AddExpenseDialog } from '../../components/molecules';
import './Categories.css';



class Categories extends Component {
    
    render () {

        return (<LoggedTemplate 
                    {...this.props} 
                    title='Categorias'
                    >
                        <ListCategories {...this.props} />
                        <div className="floating-button-align">
                            <AddExpenseDialog {...this.props} onChange={this.onChange}/>
                        </div>
                </LoggedTemplate>
        )
    
    }
    
    
}

export default Categories;