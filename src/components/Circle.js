import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PREFIX } from "../constant";
export default class Circle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { cx, cy, r, className, ...rest } = this.props;
    /** check the props */
    if (cx === +cx && cy === +cy && r === +r) {
      return (
        <circle
          className={cx(`${PREFIX}-circle`, className)}
          cx={cx}
          cy={cy}
          r={r}
          {...rest}
        />
      );
    } else return null;
  }
}
Circle.displayName = `${PREFIX}-Circle`;
Circle.propTypes = {
  className: PropTypes.string,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  style: PropTypes.object
};
Circle.defaultProps = {};
