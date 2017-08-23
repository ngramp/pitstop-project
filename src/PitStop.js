import React from 'react';
class PitStop extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.pitStop.vehicleNumber}
        </td>
        <td>
          {this.props.pitStop.timeIn}
        </td>
        <td>
          {this.props.pitStop.timeOut}
        </td>
      </tr>
    );
  }
}
export default PitStop;
