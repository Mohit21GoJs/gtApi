import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';

const styles = () => ({
  root: {
    padding: '2vh',
    borderBottom: '1px',
  },
  textField: {
    marginLeft: 2,
    marginRight: 2,
    width: '100%',
  },
  chip: {
    marginRight: 5,
  },
});

function ListComponent(props) {
  const { classes, gist } = props;
  const files = Object.keys(gist.files) || [];
  return (
    <Card className={classes.root}>
      <CardHeader title={`Gist #${gist.id}`} />
      <CardContent>
        <Grid container spacing={90} alignItems="center">
          {gist.description ? (
            <Grid item xs={12}>
              <Typography variant="subheading">
                Description: {gist.description}
              </Typography>
            </Grid>) : null}
          <Grid item xs={12}>
            {files &&
              files.length &&
              files.map(file => (
                <Chip
                  label={gist.files[file].type}
                  clickable
                  className={classes.chip}
                  color="primary"
                  variant="outlined"
                />
              ))}
          </Grid>
          <Grid item xs={12} />
        </Grid>
      </CardContent>
    </Card>
  );
}

ListComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  gist: PropTypes.shape(),
};

ListComponent.defaultProps = {
  gist: {},
};

export default withStyles(styles)(ListComponent);
