import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Yellow from '@material-ui/core/colors/yellow';
/* 
  Must have props for any autocomplete
  id : string
  options : array of objects
  optionLabel : the obj property to be shown
  style : object
  label : label of autocomplete textfield
*/
const useStyles = makeStyles(theme => ({
    root : props => ({
    //  ...props.style,
      margin : 10,
    }),
    autocompleteInput : {
        backgroundColor : Yellow[50]
    }
  })
); 
export default function AutoCompleteBox(props) {
const classes = useStyles(props);
const destinationChange = (e,val) => {
  props.handlePlanetChange(val);
 }
  return (
    <Autocomplete
      className = {'my-clas ' + classes.root} 
      classes = {{
        input : classes.autocompleteInput
      }}
      id= {props.id}
      options={props.options}
      getOptionLabel={option => option[props.optionLabel]}
      onChange = {destinationChange}
      renderInput={params => (
        <TextField {...params} label={props.label} variant="outlined" fullWidth />
      )}
    />
  );
}