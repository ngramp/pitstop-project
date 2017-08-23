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
      pitStops: {},
      pageSize: 40
    };
  }
  componentDidMount() {
    this.loadFromServer(this.state.pageSize);
  }
  loadFromServer(pageSize) {
    follow(client, root, [{ rel: 'pitstops', params: { size: pageSize } }])
      .then(pitStopCollection => {
        return client({
          method: 'GET',
          path: pitStopCollection.entity._links.profile.href,
          headers: { Accept: 'application/schema+json' }
        }).then(schema => {
          this.schema = schema.entity;
          return pitStopCollection;
        });
      })
      .done(pitStopCollection => {
        this.setState({
          pitStops: pitStopCollection.entity._embedded.pitStops,
          attributes: Object.keys(this.schema.properties),
          pageSize: pageSize,
          links: pitStopCollection.entity._links
        });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to PitStops</h2>
        </div>
        {/*<PitStopList*/}
        {/*pitStops={this.state.pitStops}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default App;
