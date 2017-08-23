import React from 'react';
import CommentDialog from './CommentDialog';
const client = require('./libs/Client');

class PitStop extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDelete = this.handleDelete.bind(this);
  }
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
        <td>
          {this.props.pitStop.comment}
        </td>
        <td>
          <CommentDialog
            pitStop={this.props.pitStop}
            attributes={this.props.attributes}
            onUpdate={this.props.onUpdate}
          />
        </td>
      </tr>
    );
  }
}

export default PitStop;
