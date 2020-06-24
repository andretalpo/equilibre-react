import React, { Component } from 'react';
import ApiService from '../../../api/service';

//Internal Components
import { CategoryListItems, AddCategoryDialog } from '../../molecules';

//Material-UI COmponents
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';


//Importing CSS
import './ListCategories.css';


class ListCategories extends Component {

  state = {
    dense: false,
    categories: [],
  };
  
  async componentDidMount () {

    const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);

    this.setState({
      categories: allCategories,
    });
  };

  deleteCategory = async (categoryId) => {
    try {
      const body = {
        _id : categoryId
      }
      await ApiService.deleteCategory(body);

      const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);
      
      this.setState({
        categories: allCategories,
      });
      
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
      
      this.setState({
        categories: allCategories,
      });
      
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
      
      this.setState({
        categories: allCategories,
      });
      
    } catch (err) {
      console.log(err)
    
    }
  }

  render() {

    return (
          <div >
            <Grid item xs={12} md={6}>
              <div className="add-button-align">
                <AddCategoryDialog addCategory={this.addCategory}/>
              </div>
                
                <Typography variant="h6" >
                </Typography>
                <div >
                  <List dense={this.state.dense}>
                    {
                      this.state.categories.length === 0
                      ? (<Skeleton animation="wave" />)
                      :  this.state.categories.map( (element,index) => {
                          return (
                            <CategoryListItems element={element} editCategory={this.editCategory} deleteCategory={this.deleteCategory} key={`elementList-${index}`}/>
                          )
                       })
                      }
                  </List>
                </div>
              </Grid>
          </div>
      );
    }
} 

export default ListCategories
