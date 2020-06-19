import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import ApiService from '../../../api/service';
import { ModalEditCategory } from '../../molecules';


import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


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

  async deleteCategory (categoryId) {
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

  async editCategory (values,categoryId) {
    try {
      
      console.log(values);
      console.log(categoryId);
      const data = await ApiService.editCategory(values);
      const allCategories = await ApiService.editCategory(values);

      this.setState({
        categories: allCategories,
      });
      
    } catch (err) {
      console.log(err)
    
    }
  }

  render() {
    const { classes } = this.props;

    return (
          <div className={classes.root}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <div className={classes.demo}>
                  <List dense={this.state.dense}>
                    {
                      this.state.categories.length === 0
                      ? (<Skeleton animation="wave" />)
                      :  this.state.categories.map( (element,index) => {
                          return (
                          <ListItem key={`element-${index}`}>
                            <ListItemText
                              primary={`${element.name}`}
                            />
                            <ListItemSecondaryAction>
                                <ModalEditCategory  editCategory={ this.editCategory } categoryId={ element._id } categoryName={ element.name }/>
                              <IconButton edge="end" aria-label="delete" onClick={ value => this.deleteCategory(`${element._id}`)}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
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

export default withStyles(useStyles)(ListCategories)
