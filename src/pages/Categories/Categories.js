import React,{ Component } from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/molecules';


class Categories extends Component {
    
    
    render () {
        return (<LoggedTemplate 
            {...this.props} 
            title='Categories'
            >
                <ListCategories {...this.props}/>
            </LoggedTemplate>
        )
    }
    
}

export default Categories;