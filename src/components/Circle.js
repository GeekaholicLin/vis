import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import cl from "classnames";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
export default class Circle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, left, top, cx, cy, r, ...rest } = this.props;
    /** check the props */
    if (cx === +cx && cy === +cy && r === +r) {
      return (
        <circle
          className={cl(`${PREFIX}-circle`, className)}
          cx={cx}
          cy={cy}
          r={r}
          transform={`translate(${left},${top})`}
          {...rest}
        />
      );
    } else return null;
  }
}
Circle.displayName = `${PREFIX}Circle`;
Circle.propTypes = {
  className: PropTypes.string,
  cx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Circle.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
