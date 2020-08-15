import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.cellFlipper(this.props.coordinates);
  }

  render() {
    var classes = 'Cell' + (this.props.isLit ? ' Cell-lit' : '');

    return <td className={classes} onClick={this.handleClick} />;
  }
}

export default Cell;
