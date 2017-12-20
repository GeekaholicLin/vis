import React, { Component } from "react";
import PropTypes from "prop-types";
import { PREFIX } from "../constant";
import cx from "classnames";

export default class Group extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, children, left, top, ...rest } = this.props;
    return (
      <g
        className={cx(`${PREFIX}-group`, className)}
        transform={`translate(${left},${top})`}
        {...rest}
      >
        {children}
      </g>
    );
  }
}
Group.displayName = `${PREFIX}-Group`;
Group.propTypes = {
  className: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number,
  children: PropTypes.node
};
Group.defaultProps = {
  left: 0,
  top: 0
};
