import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { filterDataLayer } from '../utils/mapLayers';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: '20px',
    zIndex: 10,
    right: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: '12px',
    borderRadius: '8px',
  },
  form: {
    height: 50,
    width: 150,
  },
});

const Filter = ({ data }) => {
  const classes = useStyles();
  const [filterValue, setFilter] = useState('all');

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
    filterDataLayer('clusterLayer', value, data);
  };

  const categories = data.points.reduce((acc, { categories: categoriesStr }) => {
    const categories = categoriesStr.split(', ');

    return [...acc, ...categories];
  }, []);

  const filters = [...new Set(categories)];
  
  const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

  return (
    <div className={classes.container}>
      <FormControl className={classes.form}>
        <Select value={filterValue} onChange={handleChange}>
          <MenuItem value="all">Показать все</MenuItem>
          
          {filters.map(filter => {
            return <MenuItem value={filter}>{capitalize(filter)}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
