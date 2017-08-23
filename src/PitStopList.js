import React from 'react';
import PitStop from './PitStop';

class PitStopList extends React.Component {
  render() {
    var pitStops = this.props.pitStops.map(pitStop =>
      <PitStop key={pitStop._links.self.href} pitStop={pitStop} />
    );
    return (
      <table>
        <tbody>
          <tr>
            <th>Vehicle Number</th>
            <th>Time In</th>
            <th>Time Out</th>
          </tr>
          {pitStops}
        </tbody>
      </table>
    );
  }
}

export default PitStopList;
