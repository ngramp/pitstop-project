import React from 'react';
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
      attributes: [],
      pageSize: 20,
      links: {}
    };
    this.updatePageSize = this.updatePageSize.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.loadFromServer = this.loadFromServer.bind(this);
  }

  componentDidMount() {
    this.loadFromServer(this.state.pageSize);
  }
  async loadFromServer(pageSize) {
    const pitStopCollection = await follow(client, root, [
      { rel: 'pitstops', params: { size: pageSize } }
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
      pageSize: pageSize,
      links: pitStopCollection.entity._links
    });
    //window.console.log(Object.keys(this.schema.properties))
  }

  updatePageSize(pageSize) {
    if (pageSize !== this.state.pageSize) {
      this.loadFromServer(pageSize);
    }
  }

  async onNavigate(navUri) {
    const pitStopCollection = await client({ method: 'GET', path: navUri });
    this.setState({
      pitStops: pitStopCollection.entity._embedded.pitstops,
      attributes: this.state.attributes,
      pageSize: this.state.pageSize,
      links: pitStopCollection.entity._links
    });
  }

  async onUpdate(pitStop, updatedPitStop) {
    //window.console.log(pitStop);
    const response = await client({
      method: 'PUT',
      path: pitStop._links.self.href,
      entity: updatedPitStop,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.loadFromServer(this.state.pageSize);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to PitStops</h2>
        </div>
        <div>
          <PitStopList
            pitStops={this.state.pitStops}
            links={this.state.links}
            pageSize={this.state.pageSize}
            onNavigate={this.onNavigate}
            updatePageSize={this.updatePageSize}
            onUpdate={this.onUpdate}
            attributes={this.state.attributes}
          />
        </div>
      </div>
    );
  }
}

export default App;
