import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import AppBar from './components/AppBar';
import Search from './components/Search';

const styles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    height: '100vh',
  },
  content: {
    paddingTop: '2vh',
    paddingLeft: '2vw',
  },
});

class App extends PureComponent {
  state = {
    disableSearchBtn: true,
  };

  searchHandler = () => {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar appTitle="Social Github" navigateToGithub={() => {}} />
        <Grid className={classes.content} spacing={100} container>
          <Grid item xs={12} sm={4}>
            <Search
              searchHandler={() => {}}
              isSeachBtnDisabled={this.state.disableSearchBtn}
            />
          </Grid>
          <Grid item sm={1} />
          <Grid item xs={12} sm={6}>
            Hello
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(App);
