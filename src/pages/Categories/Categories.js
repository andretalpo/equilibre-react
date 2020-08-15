import React, { Component } from 'react';
import { LoggedTemplate } from '../../templates';
import { AddExpenseDialog } from '../../components//molecules';
import './Categories.css';


import ApiService from '../../api/service';

//Internal Components
import { CategoryListItems, AddCategoryDialog } from '../../components/molecules';
import { ConfirmDialog } from '../../components/atoms';

//Material-UI COmponents
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';



class Categories extends Component {
    state = {
        categories: [],
        dense: false,
        apiErrorMessage: '',
        didMounted: false,
    }

    async componentDidMount () {

        const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);
    
        this.onChange(allCategories);
        this.setState({
            didMounted: true,
        })
      };

    onChange = (allCategories) => {
        this.setState({
            categories: allCategories,
        });
    }

    deleteCategory = async (categoryId) => {
        try {
          const body = {
            _id : categoryId
          }
          const data = await ApiService.deleteCategory(body);
          
          if(data){
            this.setState({
              apiErrorMessage: data,
            })
          }
    
          const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);
          
          this.onChange(allCategories);
          
        } catch (err) {
          console.log(err)
        
        }
      }
    
     editCategory = async (values,categoryId) => {
        try {
    
          const category = {
            _id: categoryId,
            newName: values.name
          }
    
          await ApiService.editCategory(category);
    
          const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);
          
          this.onChange(allCategories);
          
        } catch (err) {
          console.log(err)
        
        }
      }
    
      addCategory = async (category) => {
        try {
    
          const newCategory = { ...category }
          newCategory.user = this.props.userInfo._id
          await ApiService.addCategory(newCategory);
    
          
          const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);
          
          this.onChange(allCategories);
          
        } catch (err) {
          console.log(err)
        
        }
      }
    
      clearApiErrorMessage = () => {
        this.setState({
            apiErrorMessage: '',
        })
      }

    render () {

      let floactButtonHeight=window.innerHeight - 100;

      return (<LoggedTemplate 
                  {...this.props} 
                  title='Categorias'
                  >
                      <div className='size-list-categories'>
                          <Grid item xs={12} md={6}>
                          <div className="add-button-align">
                              <AddCategoryDialog addCategory={this.addCategory}/>
                          </div>
                              
                              <Typography variant="h6" >
                              </Typography>
                              <div >
                              <List dense={this.state.dense}>
                                  {
                                      this.state.categories.length === 0 && this.state.didMounted === true
                                      ?  <Typography variant="h6" >Sem categorias cadastradas</Typography>
                                      :  this.state.didMounted === false
                                      ?  <Skeleton animation="wave" />
                                      : this.state.categories.map( (element,index) => {
                                              return (
                                                  <CategoryListItems element={element} editCategory={this.editCategory} deleteCategory={this.deleteCategory} key={`elementList-${index}`}/>
                                              )
                                          })
                                  }
                              {this.state.apiErrorMessage ? <ConfirmDialog okMethod={this.clearApiErrorMessage} apiErrorMessage={this.state.apiErrorMessage} /> : ''}
                              </List>
                              </div>
                          </Grid>
                      </div>
                      <div className="floating-button-align" style={{top:floactButtonHeight}}>
                          <AddExpenseDialog {...this.props} categories={this.state.categories}/>
                      </div>
              </LoggedTemplate>
      )
    
    }
    
    
}

export default Categories;