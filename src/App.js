import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import PitStopList from './PitStopList';
import logo from './logo.svg';
const client = require('./libs/Client');
const follow = require('./libs/follow');
const root = '/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pitStops: [],
      pageSize: 40
    };
  }
  async componentDidMount() {
    const pitStopCollection = await follow(client, root, [
      { rel: 'pitstops', params: { size: this.state.pageSize } }
    ]);
    const schema = await client({
      method: 'GET',
      path: pitStopCollection.entity._links.profile.href,
      headers: { Accept: 'application/schema+json' }
    });

    this.schema = schema.entity;
    this.setState({
      pitStops: pitStopCollection.entity._embedded.pitstops,
      attributes: Object.keys(this.schema.properties),
      pageSize: this.state.pageSize,
      links: pitStopCollection.entity._links
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to PitStops</h2>
        </div>
        <PitStopList pitStops={this.state.pitStops} />
      </div>
    );
  }
}

export default App;
