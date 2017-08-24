import React from 'react';
import './App.css';
import InlineEdit from "react-edit-inline/index";
import {forms} from 'bootstrap-css'
import * as moment from 'moment';
import 'moment-duration-format';
Object.assign(forms);


class PitStop extends React.Component {
    constructor(props) {
        super(props);
        this.dataChanged = this.dataChanged.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            timeIn: moment.duration(this.props.pitStop.timeIn * 1000, 'ms').format('hh[h] mm[m] ss[s]', 3),
            timeOut: moment.duration(this.props.pitStop.timeOut * 1000, 'ms').format('hh[h] mm[m] ss[s]', 3)

        };
    }
    dataChanged(data) {
        //window.console.log(data);
        var updatedPitStop = {};
        this.props.attributes.forEach(attribute => {
            if (attribute === 'comment') {
                updatedPitStop[attribute] = data.comment;
            } else {
                updatedPitStop[attribute] = this.props.pitStop[attribute];
            }
        });
        this.props.onUpdate(this.props.pitStop, updatedPitStop);
        window.location = '#';
    }
    static customValidateText(text) {
        if (text){
            return (text.length > 0 && text.length < 256);
        }
        else {
            return false;
        }

    }
    handleClick(e){
        e.preventDefault();
        this.setState({
            editing: true
        })
    }
    handleBlur(e){
        this.setState({
            editing: false
        })
    }
    render() {
        return (
            <tr colSpan={3} onClick={this.handleClick} onBlur={this.handleBlur}>
                <td colSpan={3}>
                    <div className="row">
                        <div>
                            {this.props.pitStop.vehicleNumber}
                        </div>
                        <div>
                            {this.state.timeIn}
                        </div>
                        <div>
                            {this.state.timeOut}
                        </div>
                    </div>
                    <div className="row comments" colSpan={3}>
                        <InlineEdit
                            validate={PitStop.customValidateText}
                            activeClassName="form-control"
                            text={this.props.pitStop.comment}
                            paramName="comment"
                            change={this.dataChanged}
                            editing={this.state.editing || false}
                            style={{
                                minWidth: 150,
                                display: 'inline-block',
                                margin: 0,
                                padding: 0,
                                fontSize: 15,
                                outline: 0,
                                border: 0
                            }}
                        />
                    </div>
                </td>
                {/*<td>*/}
                    {/*{this.props.pitStop.comment}*/}
                {/*</td>*/}
                {/*<td>*/}
                    {/*<CommentDialog*/}
                        {/*pitStop={this.props.pitStop}*/}
                        {/*attributes={this.props.attributes}*/}
                        {/*onUpdate={this.props.onUpdate}*/}
                    {/*/>*/}
                {/*</td>*/}
            </tr>
        );
    }
}

export default PitStop;
