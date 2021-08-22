import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useCity } from '../../../../hooks/useCity';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
/*
const names = ['Aveiro','Beja','Braga','Bragança','Castelo Branco','Coimbra','Évora','Faro','Guarda','Leiria','Lisboa','Portalegre','Porto','Santarém','Setúbal','Viana do Castelo','Vila Real','Viseu'];
*/
/*
const regions = ['Aveiro','Beja'];
 */

const regions = {
  1010500: 'Aveiro',
  1020500: 'Beja',
  1030300: 'Braga',
  1040200: 'Bragança',
  1050200: 'Castelo Branco',
  1060300: 'Coimbra',
  1070500: 'Évora',
  1080500: 'Faro',
  1090700: 'Guarda',
  1100900: 'Leiria',
  1110600: 'Lisboa',
  1121400: 'Portalegre',
  1131200: 'Porto',
  1141600: 'Santarém',
  1151200: 'Setúbal',
  1160900: 'Viana do Castelo',
  1171400: 'Vila Real',
  1182300: 'Viseu',
};


function getStyles(name, regionName, theme) {
  return {
    fontWeight:
      regionName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function RegionFilter() {
  const classes = useStyles();
  const theme = useTheme();
  const [regionName, setRegionName] = React.useState([]);
  const { addCity } = useCity();

  const handleChange = (event) => {
    setRegionName(event.target.value);
  };

  useEffect(() => {
    addCity(regionName)
  }, [regionName]);


  return (
    <div>
      <Grid
        container
      >
        <Grid
          item
          xs={12}
        >

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Distritos</InputLabel>
            <Select
              id="demo-mutiple-chip"
              input={<Input id="select-multiple-chip" />}
              labelId="demo-mutiple-chip-label"
              multiple
              onChange={handleChange}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip
                      className={classes.chip}
                      key={value}
                      label={regions[value]}
                    />
                  ))}
                </div>
              )}
              value={regionName}
            >
              {Object.keys(regions).map(id => (
                <MenuItem
                  key={id}
                  value={id}
                >
                  {regions[id]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

