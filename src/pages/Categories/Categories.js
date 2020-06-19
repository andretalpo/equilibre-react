import React,{ Component } from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/molecules';



class Categories extends Component {
    
    async componentDidMount () {

      };
    
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