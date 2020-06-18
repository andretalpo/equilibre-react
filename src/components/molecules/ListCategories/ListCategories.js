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
    console.log('DID MOUNT')
    console.log(this.state.userInfo);
    const allCategories = await ApiService.listAllCategories(this.props.userInfo._id);



    const categoriesToRender = allCategories.map((element,index) => {
      return (
      <ListItem>
      <ListItemText
        primary={`${element.name}`}
      />
      <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={ value => this.deleteCategory(`${element._id}`)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem> )
      }); 

      this.setState({
        categories: categoriesToRender,
      });
      console.log(this.state.categories)
    
  };

  async deleteCategory (value) {
      try {
    
        console.log(value);
      } catch (err) {
        console.log('falhou')
    
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
                      ? (<h1>teste2</h1>)
                      :  this.state.categories

                    }
                      {/* <ListItem>
                        <ListItemText
                          primary="Alimentação"
                        />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={ value => this.deleteCategory('teste')}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem> */}
                  </List>
                </div>
              </Grid>
          </div>
      );
    }
} 

export default withStyles(useStyles)(ListCategories)
