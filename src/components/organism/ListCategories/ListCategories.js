import React, { Component } from 'react';
import ApiService from '../../../api/service';

//Internal Components
import { CategoryListItems } from '../../molecules';

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
      console.log(values)
      const category = {
        _id: categoryId,
        newName: values.category
      }
      console.log(category)
      const data = await ApiService.editCategory(category);
      console.log(data)
      
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
                <Typography variant="h6" >
                </Typography>
                <div >
                  <List dense={this.state.dense}>
                    {
                      this.state.categories.length === 0
                      ? (<Skeleton animation="wave" />)
                      :  this.state.categories.map( (element,index) => {
                          return (
                            <CategoryListItems element={element} editCategory={this.editCategory} categoryId={element._id} categoryName={element.name} key={`elementList-${index}`}/>
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
