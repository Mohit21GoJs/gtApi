import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import AppBar from './components/AppBar';
import Search from './components/Search';
import ListComponent from './components/ListComponent';
import { getData } from './helpers/api';

const styles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    minHeight: '100vh',
  },
  content: {
    paddingTop: '2vh',
    paddingLeft: '2vw',
  },
  divideCards: {
    marginTop: 10,
  },
});

class App extends PureComponent {
  state = {
    loadingGists: false,
    gists: [],
    username: '',
  };

  checkSearchBtnDisabled = () =>
    !this.state.username || this.state.loadingGists;

  makeGistUrl = username => `https://api.github.com/users/${username}/gists`;
  usernameHandler = val =>
    this.setState({
      username: val,
    });

  seachForGists = () => {
    const url = this.makeGistUrl(this.state.username);
    this.setState({
      loadingGists: true,
    });
    getData(url)
      .then((data) => {
        if (data) {
          this.setState({
            gists: data,
            loadingGists: false,
          });
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  render() {
    const { classes } = this.props;
    const { gists } = this.state;
    return (
      <div className={classes.root}>
        <AppBar appTitle="Gist Tracker" navigateToGithub={() => {}} />
        <Grid className={classes.content} spacing={100} container>
          <Grid item xs={12} md={4}>
            <Search
              usernameHandler={this.usernameHandler}
              searchHandler={this.seachForGists}
              isSeachBtnDisabled={this.checkSearchBtnDisabled()}
            />
          </Grid>
          <Grid item sm={1} />
          <Grid item xs={12} md={6}>
            {gists && gists.length
              ? gists.map(gist => (
                <Fragment>
                  <ListComponent gist={gist} />
                  <div className={classes.divideCards} />
                </Fragment>
                ))
              : null}
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
