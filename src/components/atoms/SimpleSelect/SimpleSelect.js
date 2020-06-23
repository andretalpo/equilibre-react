import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const onSubmit = () => {
    console.log()
  }

  const options = props.options.map((element,index) => {
    return <MenuItem value={element.name} key={`options${index}`}>{element.name}</MenuItem>
  })
  return (
    <div>
      <FormControl className={classes.formControl} onClick={onSubmit}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=""
          onChange={handleChange}
        >
          {options}
        </Select>
      </FormControl>
    </div>
  );
}
