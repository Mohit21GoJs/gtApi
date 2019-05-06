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

    // const forks = [
    //   {
    //     url: 'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f',
    //     forks_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/forks',
    //     commits_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/commits',
    //     id: '912f0b2868960e7f2406b437c49a6a0f',
    //     node_id: 'MDQ6R2lzdDkxMmYwYjI4Njg5NjBlN2YyNDA2YjQzN2M0OWE2YTBm',
    //     git_pull_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     git_push_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     html_url: 'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f',
    //     files: {},
    //     public: true,
    //     created_at: '2019-04-21T16:13:41Z',
    //     updated_at: '2019-04-21T16:14:26Z',
    //     description: '',
    //     comments: 0,
    //     user: null,
    //     comments_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/comments',
    //     owner: {
    //       login: 'Mohit21GoJs',
    //       id: 42065586,
    //       node_id: 'MDQ6VXNlcjQyMDY1NTg2',
    //       avatar_url: 'https://avatars2.githubusercontent.com/u/42065586?v=4',
    //       gravatar_id: '',
    //       url: 'https://api.github.com/users/Mohit21GoJs',
    //       html_url: 'https://github.com/Mohit21GoJs',
    //       followers_url: 'https://api.github.com/users/Mohit21GoJs/followers',
    //       following_url:
    //         'https://api.github.com/users/Mohit21GoJs/following{/other_user}',
    //       gists_url: 'https://api.github.com/users/Mohit21GoJs/gists{/gist_id}',
    //       starred_url:
    //         'https://api.github.com/users/Mohit21GoJs/starred{/owner}{/repo}',
    //       subscriptions_url:
    //         'https://api.github.com/users/Mohit21GoJs/subscriptions',
    //       organizations_url: 'https://api.github.com/users/Mohit21GoJs/orgs',
    //       repos_url: 'https://api.github.com/users/Mohit21GoJs/repos',
    //       events_url:
    //         'https://api.github.com/users/Mohit21GoJs/events{/privacy}',
    //       received_events_url:
    //         'https://api.github.com/users/Mohit21GoJs/received_events',
    //       type: 'User',
    //       site_admin: false,
    //     },
    //   },
    //   {
    //     url: 'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f',
    //     forks_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/forks',
    //     commits_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/commits',
    //     id: '912f0b2868960e7f2406b437c49a6a0f',
    //     node_id: 'MDQ6R2lzdDkxMmYwYjI4Njg5NjBlN2YyNDA2YjQzN2M0OWE2YTBm',
    //     git_pull_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     git_push_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     html_url: 'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f',
    //     files: {},
    //     public: true,
    //     created_at: '2019-04-21T16:13:41Z',
    //     updated_at: '2019-04-21T16:14:26Z',
    //     description: '',
    //     comments: 0,
    //     user: null,
    //     comments_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/comments',
    //     owner: {
    //       login: 'Mohit21GoJs',
    //       id: 42065586,
    //       node_id: 'MDQ6VXNlcjQyMDY1NTg2',
    //       avatar_url: 'https://avatars2.githubusercontent.com/u/42065586?v=4',
    //       gravatar_id: '',
    //       url: 'https://api.github.com/users/Mohit21GoJs',
    //       html_url: 'https://github.com/Mohit21GoJs',
    //       followers_url: 'https://api.github.com/users/Mohit21GoJs/followers',
    //       following_url:
    //         'https://api.github.com/users/Mohit21GoJs/following{/other_user}',
    //       gists_url: 'https://api.github.com/users/Mohit21GoJs/gists{/gist_id}',
    //       starred_url:
    //         'https://api.github.com/users/Mohit21GoJs/starred{/owner}{/repo}',
    //       subscriptions_url:
    //         'https://api.github.com/users/Mohit21GoJs/subscriptions',
    //       organizations_url: 'https://api.github.com/users/Mohit21GoJs/orgs',
    //       repos_url: 'https://api.github.com/users/Mohit21GoJs/repos',
    //       events_url:
    //         'https://api.github.com/users/Mohit21GoJs/events{/privacy}',
    //       received_events_url:
    //         'https://api.github.com/users/Mohit21GoJs/received_events',
    //       type: 'User',
    //       site_admin: false,
    //     },
    //   },
    //   {
    //     url: 'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f',
    //     forks_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/forks',
    //     commits_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/commits',
    //     id: '912f0b2868960e7f2406b437c49a6a0f',
    //     node_id: 'MDQ6R2lzdDkxMmYwYjI4Njg5NjBlN2YyNDA2YjQzN2M0OWE2YTBm',
    //     git_pull_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     git_push_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     html_url: 'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f',
    //     files: {},
    //     public: true,
    //     created_at: '2019-04-21T16:13:41Z',
    //     updated_at: '2019-04-21T16:14:26Z',
    //     description: '',
    //     comments: 0,
    //     user: null,
    //     comments_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/comments',
    //     owner: {
    //       login: 'Mohit21GoJs',
    //       id: 42065586,
    //       node_id: 'MDQ6VXNlcjQyMDY1NTg2',
    //       avatar_url: 'https://avatars2.githubusercontent.com/u/42065586?v=4',
    //       gravatar_id: '',
    //       url: 'https://api.github.com/users/Mohit21GoJs',
    //       html_url: 'https://github.com/Mohit21GoJs',
    //       followers_url: 'https://api.github.com/users/Mohit21GoJs/followers',
    //       following_url:
    //         'https://api.github.com/users/Mohit21GoJs/following{/other_user}',
    //       gists_url: 'https://api.github.com/users/Mohit21GoJs/gists{/gist_id}',
    //       starred_url:
    //         'https://api.github.com/users/Mohit21GoJs/starred{/owner}{/repo}',
    //       subscriptions_url:
    //         'https://api.github.com/users/Mohit21GoJs/subscriptions',
    //       organizations_url: 'https://api.github.com/users/Mohit21GoJs/orgs',
    //       repos_url: 'https://api.github.com/users/Mohit21GoJs/repos',
    //       events_url:
    //         'https://api.github.com/users/Mohit21GoJs/events{/privacy}',
    //       received_events_url:
    //         'https://api.github.com/users/Mohit21GoJs/received_events',
    //       type: 'User',
    //       site_admin: false,
    //     },
    //   },
    //   {
    //     url: 'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f',
    //     forks_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/forks',
    //     commits_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/commits',
    //     id: '912f0b2868960e7f2406b437c49a6a0f',
    //     node_id: 'MDQ6R2lzdDkxMmYwYjI4Njg5NjBlN2YyNDA2YjQzN2M0OWE2YTBm',
    //     git_pull_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     git_push_url:
    //       'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f.git',
    //     html_url: 'https://gist.github.com/912f0b2868960e7f2406b437c49a6a0f',
    //     files: {},
    //     public: true,
    //     created_at: '2019-04-21T16:13:41Z',
    //     updated_at: '2019-04-21T16:14:26Z',
    //     description: '',
    //     comments: 0,
    //     user: null,
    //     comments_url:
    //       'https://api.github.com/gists/912f0b2868960e7f2406b437c49a6a0f/comments',
    //     owner: {
    //       login: 'Mohit21GoJs',
    //       id: 42065586,
    //       node_id: 'MDQ6VXNlcjQyMDY1NTg2',
    //       avatar_url: 'https://avatars2.githubusercontent.com/u/42065586?v=4',
    //       gravatar_id: '',
    //       url: 'https://api.github.com/users/Mohit21GoJs',
    //       html_url: 'https://github.com/Mohit21GoJs',
    //       followers_url: 'https://api.github.com/users/Mohit21GoJs/followers',
    //       following_url:
    //         'https://api.github.com/users/Mohit21GoJs/following{/other_user}',
    //       gists_url: 'https://api.github.com/users/Mohit21GoJs/gists{/gist_id}',
    //       starred_url:
    //         'https://api.github.com/users/Mohit21GoJs/starred{/owner}{/repo}',
    //       subscriptions_url:
    //         'https://api.github.com/users/Mohit21GoJs/subscriptions',
    //       organizations_url: 'https://api.github.com/users/Mohit21GoJs/orgs',
    //       repos_url: 'https://api.github.com/users/Mohit21GoJs/repos',
    //       events_url:
    //         'https://api.github.com/users/Mohit21GoJs/events{/privacy}',
    //       received_events_url:
    //         'https://api.github.com/users/Mohit21GoJs/received_events',
    //       type: 'User',
    //       site_admin: false,
    //     },
    //   },
    // ];
    this.setState(prevState => ({
      forksForGists: {
        ...prevState.forksForGists,
        [gist.id]: { data: forks.slice(-3), isLoading: false },
      },
    }));
  };

  seachForGists = () => {
    const url = this.makeGistUrl(this.state.username);
    this.setState({
      loadingGists: true,
      forksForGists: {},
    });
    getData(url)
      // eslint-disable-next-line arrow-parens
      .then(data => {
        let gists = [];
        if (data) {
          gists = [...data];
          this.setState({
            gists: data,
            loadingGists: false,
          });
        }
        // eslint-disable-next-line no-debugger
        debugger;
        return gists;
      })
      .then(gists => Array.isArray(gists) && gists.forEach(this.fetchGistUsers))
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  render() {
    const { classes } = this.props;
    const { gists, forksForGists } = this.state;
    // eslint-disable-next-line no-debugger
    debugger;
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
