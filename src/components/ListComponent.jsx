import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const { classes, gist, forkForGist } = props;
  // eslint-disable-next-line no-debugger
  // debugger;
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
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Grid container justify="left" spacing={100}>
              {files && files.length
                ? files.map(file => (
                    <Chip
                      label={gist.files[file].type}
                      clickable
                      className={classes.chip}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                : null}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="left" spacing={100}>
              {forkForGist && forkForGist.isLoading ? (
                <CircularProgress />
              ) : null}
              {forkForGist && forkForGist.data && forkForGist.data.length
                ? forkForGist.data.map(fork => (
                    <a href={fork.html_url}>
                      <Avatar
                        alt={fork.owner.login}
                        src={fork.owner.avatar_url}
                      />
                    </a>
                  ))
                : null}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ListComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  gist: PropTypes.shape(),
  forkForGist: PropTypes.shape().isRequired,
};

ListComponent.defaultProps = {
  gist: {},
};

export default withStyles(styles)(ListComponent);
