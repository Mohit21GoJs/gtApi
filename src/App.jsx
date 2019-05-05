import { PureComponent } from 'react';
import './App.css';

export default class App extends PureComponent {
  state = {
    name: 'gt',
  };

  searchHandler = () => {};

  render() {
    return (
      <div className="App">
        <h1>Welcome to {this.state.name}</h1>
      </div>
    );
  }
}
