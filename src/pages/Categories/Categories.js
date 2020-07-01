import React, { Component } from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/organism';
import { AddExpenseDialog } from '../../components/molecules';
import './Categories.css';



class Categories extends Component {
    state = {
        categories: [],
    }

    onChange = (categories) => {
        this.setState({
            categories: categories,
        })
    }

    render () {

        return (<LoggedTemplate 
                    {...this.props} 
                    title='Categorias'
                    >
                        <ListCategories {...this.props} categories={this.state.categories} onChange={this.onChange} />
                        <div className="floating-button-align">
                            <AddExpenseDialog {...this.props} categories={this.state.categories}/>
                        </div>
                </LoggedTemplate>
        )
    
    }
    
    
}

export default Categories;