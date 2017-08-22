import React from 'react';
import axios from 'axios';
import DataApi from './DataApi';
import logo from './logo.svg';
import './App.css';
import PitStopList from "./PitStopList";

class App extends React.Component {
    async componentDidMount(){
        const resp = await axios.get('/api/pitstops');
        const api = new DataApi(resp.data);

        this.setState(() => {
            return {
                pitStops : api.getPitStops()
            }
        });
    }
    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to PitStops</h2>
            </div>
            <PitStopList
                pitStops={this.state.pitStops}
            />

          </div>
        );
    }
}



class Table extends React.Component {

}
class TableRow extends React.Component {

}

export default App;
