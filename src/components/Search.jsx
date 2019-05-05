import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SearchButton from './SearchButton';

const styles = () => ({
  root: {
    padding: '2vh',
  },
  searchDropDowns: {
    minWidth: 20,
  },
  btnSeparator: {
    height: 10,
  },
});

function SearchComponent(props) {
  const { classes, isSeachBtnDisabled, searchHandler } = props;
  return (
    <Card className={classes.root}>
      <CardHeader title="Search Options" />
      <CardContent>
        <Grid container spacing={90} alignItems="center">
          <Grid item xs={12}>
            Input Placeholder
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <SearchButton
              handleClick={searchHandler}
              passThrough={{ disabled: isSeachBtnDisabled }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

SearchComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  isSeachBtnDisabled: PropTypes.bool.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchComponent);
