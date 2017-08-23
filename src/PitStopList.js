import React from 'react';
import PitStop from './PitStop';

const PitStopList = props => {
  let pitStops = this.props.pitStops.map(pitStop =>
    <pitStop key={pitStop._links.self.href} pitStop={pitStop} />
  );
  return (
    <table>
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Description</th>
        </tr>
        {pitStops}
      </tbody>
    </table>
  );
};

export default PitStopList;
