import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const styles = () => ({
  root: {
    width: '90%',
  },
});

function SearchButton(props) {
  const { handleClick, passThrough, classes } = props;
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      onClick={handleClick}
      className={classes.root}
      {...passThrough}
    >
      <SearchIcon />
      Search
    </Button>
  );
}

SearchButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  passThrough: PropTypes.shape().isRequired,
};

export default withStyles(styles)(SearchButton);
