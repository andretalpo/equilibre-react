import React from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/molecules';


const Categories = (props) => {
    return <LoggedTemplate 
            {...props} 
            title='Categories'
            >
                <ListCategories/>
            </LoggedTemplate>
}

export default Categories;