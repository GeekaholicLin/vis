import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { PREFIX, ALL_COMMON_PROPTYPES } from "../constant";
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
Group.displayName = `${PREFIX}Group`;
Group.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Group.defaultProps = {
  left: 0,
  top: 0
};
