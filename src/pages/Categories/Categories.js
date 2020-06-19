import React from 'react';
import { LoggedTemplate } from '../../templates';
import { ListCategories } from '../../components/molecules';



function Categories (props) {
    
    return (<LoggedTemplate 
            {...props} 
            title='Categories'
            >
                <ListCategories {...props}/>
            </LoggedTemplate>
        )
    
    
}

export default Categories;