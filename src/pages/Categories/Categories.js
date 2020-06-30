import React, { Component } from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/organism';
import { AddExpenseDialog } from '../../components/molecules';
import './Categories.css';



class Categories extends Component {
    
    state = {
        refreshCategories: false,
            }

    onChange = () => {
        this.setState({
            refreshCategories: !this.state.refreshCategories,
        });
        
    }

    render () {

        return (<LoggedTemplate 
                    {...this.props} 
                    title='Categorias'
                    >
                        <ListCategories {...this.props} onChange={this.onChange}/>
                        <div className="floating-button-align">
                            <AddExpenseDialog {...this.props} onChange={this.onChange} refresh={this.state.refreshCategories}/>
                        </div>
                </LoggedTemplate>
        )
    
    }
    
    
}

export default Categories;