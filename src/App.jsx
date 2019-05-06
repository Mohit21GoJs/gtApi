import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import './App.css';
import AppBar from './components/AppBar';
import Search from './components/Search';
import ListComponent from './components/ListComponent';
import GistLoader from './components/GistLoader';
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
  separator: {
    marginTop: '2vh',
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
    forksForGists: {},
  };

  checkSearchBtnDisabled = () =>
    !this.state.username || this.state.loadingGists;

  makeGistUrl = username => `https://api.github.com/users/${username}/gists`;
  usernameHandler = val =>
    this.setState({
      username: val,
    });

  // eslint-disable-next-line arrow-parens
  fetchGistUsers = async gist => {
    this.setState(prevState => ({
      forksForGists: {
        ...prevState.forksForGists,
        [gist.id]: { data: [], isLoading: true },
      },
    }));
    const forks = await getData(gist.forks_url);
    this.setState(prevState => ({
      forksForGists: {
        ...prevState.forksForGists,
        [gist.id]: { data: forks.slice(-3), isLoading: false },
      },
    }));
  };

  seachForGists = async () => {
    const url = this.makeGistUrl(this.state.username);
    let gists = [];
    this.setState({
      loadingGists: true,
      forksForGists: {},
      gists: [],
    });
    try {
      const data = await getData(url);
      if (data) {
        gists = [...data];
        this.setState({
          gists: data,
          loadingGists: false,
        });
      }
      // eslint-disable-next-line no-unused-expressions
      Array.isArray(gists) && gists.forEach(this.fetchGistUsers);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('error is', e);
    }
  };

  navigateToGithubHandler = () =>
    window.open('https://github.com/Mohit21GoJs/gtApi', '_blank');

  render() {
    const { classes } = this.props;
    const { gists, forksForGists, loadingGists } = this.state;
    // eslint-disable-next-line no-debugger
    debugger;
    return (
      <div className={classes.root}>
        <AppBar
          appTitle="Gist Tracker"
          navigateToGithub={this.navigateToGithubHandler}
        />
        <Grid className={classes.content} spacing={100} container>
          <Grid item xs={12} md={4}>
            <Search
              usernameHandler={this.usernameHandler}
              searchHandler={this.seachForGists}
              isSeachBtnDisabled={this.checkSearchBtnDisabled()}
            />
          </Grid>
          <Grid item xs={12} md={1} />
          <Hidden mdUp>
            <div className={classes.separator} />
          </Hidden>
          <Grid item xs={12} md={6}>
            {loadingGists ? <GistLoader /> : null}
            {gists && gists.length
              ? gists.map(gist => (
                  // eslint-disable-next-line react/jsx-indent
                  <Fragment>
                    <ListComponent
                      forkForGist={forksForGists[gist.id]}
                      gist={gist}
                    />
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
