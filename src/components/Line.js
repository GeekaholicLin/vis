import React, { Component } from "react";
import PropTypes from "prop-types";
import { PREFIX } from "../constant";
import { classNames } from "classnames";
export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let props = this.props;
    let classNames = classNames(`${PREFIX}-line`, props.className);
    <path
      className={classNames}
      stroke={props.color}
      style={props.style}
      fill="none"
      d=""
    />;
  }
}
Line.displayName = "vis-Line";
