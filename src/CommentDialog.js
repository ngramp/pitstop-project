import * as ReactDOM from 'react-dom';
import * as React from 'react';

class CommentDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var updatedPitStop = {};
        this.props.attributes.forEach(attribute => {
            if (attribute === 'comment') {
                updatedPitStop[attribute] = ReactDOM.findDOMNode(
                    this.refs[attribute]
                ).value.trim();
            } else {
                updatedPitStop[attribute] = this.props.pitStop[attribute];
            }
        });
        this.props.onUpdate(this.props.pitStop, updatedPitStop);
        window.location = '#';
    }

    render() {
        var dialogId = 'updatePitStop-' + this.props.pitStop._links.self.href;

        return (
            <div key={this.props.pitStop._links.self.href}>
                <a href={'#' + dialogId}>Update</a>
                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">
                            X
                        </a>

                        <h2>Add a comment</h2>

                        <form>
                            <input
                                type="text"
                                placeholder={this.props.pitStop.comment}
                                defaultValue={this.props.pitStop.comment}
                                ref="comment"
                                className="field"
                            />
                            <button onClick={this.handleSubmit}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentDialog;
