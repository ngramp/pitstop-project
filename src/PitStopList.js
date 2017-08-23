import React from 'react';
import PitStop from './PitStop';
import CSSModules from 'react-css-modules';
import { tables } from 'bootstrap-css';

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
        <button key="first" onClick={this.handleNavFirst}>
          &lt;&lt;
        </button>
      );
    }
    if ('prev' in this.props.links) {
      navLinks.push(
        <button key="prev" onClick={this.handleNavPrev}>
          &lt;
        </button>
      );
    }
    if ('next' in this.props.links) {
      navLinks.push(
        <button key="next" onClick={this.handleNavNext}>
          &gt;
        </button>
      );
    }
    if ('last' in this.props.links) {
      navLinks.push(
        <button key="last" onClick={this.handleNavLast}>
          &gt;&gt;
        </button>
      );
    }

    return (
      <div className="table-responsive">
        <table id="pitStopTable" className="table table-hover table-condensed">
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
        <div>
          {navLinks}
        </div>
      </div>
    );
  }
}

export default PitStopList;
