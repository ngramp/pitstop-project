import React from 'react';
import PitStop from './PitStop';
import {tables,pagination,nav} from 'bootstrap-css'
Object.assign(tables,pagination,nav);
class PitStopList extends React.Component {
    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        // this.handleInput = this.handleInput.bind(this);
    }

    handleNavFirst(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        //window.console.log(this.props.pitStops);
        var pitStops = this.props.pitStops.map(pitStop =>
            <PitStop
                key={pitStop._links.self.href}
                pitStop={pitStop}
                onUpdate={this.props.onUpdate}
                attributes={this.props.attributes}
            />
        );
        var navLinks = [];
        if ('first' in this.props.links) {
            navLinks.push(
                <button key="first" onClick={this.handleNavFirst} className="first">
                    &lt;&lt;
                </button>
            );
        }
        if ('prev' in this.props.links) {
            navLinks.push(
                <button key="prev" onClick={this.handleNavPrev} className="previous">
                    &lt;
                </button>
            );
        }
        if ('next' in this.props.links) {
            navLinks.push(
                <button key="next" onClick={this.handleNavNext} className="next">
                    &gt;
                </button>
            );
        }
        if ('last' in this.props.links) {
            navLinks.push(
                <button key="last" onClick={this.handleNavLast} className="last">
                    &gt;&gt;
                </button>
            );
        }

        return (
            <div className="table-responsive">
                <table  className="table table-hover table-condensed">
                    <thead>
                    <tr>
                        <th>Vehicle Number</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                    </tr>
                    </thead>

                    <tbody>
                    {pitStops}
                    </tbody>
                </table>
                <div className="pager">
                    {navLinks}
                </div>
            </div>
        );
    }
}

export default PitStopList;
