import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchButton from './SearchButton';

const styles = () => ({
  root: {
    padding: '2vh',
  },
  textField: {
    marginLeft: 2,
    marginRight: 2,
    width: '100%',
  },
});

function SearchComponent(props) {
  const {
    classes, isSeachBtnDisabled, searchHandler, usernameHandler,
  } = props;
  return (
    <Card className={classes.root}>
      <CardHeader title="Search Options" />
      <CardContent>
        <Grid container spacing={90} alignItems="center">
          <Grid item xs={12}>
            <TextField
              required
              id="standard-required"
              label="Enter Github Username"
              className={classes.textField}
              margin="normal"
              onChange={event => usernameHandler(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
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
  usernameHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchComponent);
