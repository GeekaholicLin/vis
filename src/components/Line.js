import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { PREFIX, ALL_COMMON_PROPTYPES } from "../constant";

export default class Line extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, left, top, from, to, ...rest } = this.props;
    return (
      <line
        className={cx(`${PREFIX}-line`, className)}
        x1={from && from.x}
        y1={from && from.y}
        x2={to && to.x}
        y2={to && to.y}
        transform={`translate(${left},${top})`}
        {...rest}
      />
    );
  }
}
Line.displayName = `${PREFIX}Line`;
Line.propTypes = {
  className: PropTypes.string,
  from: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }), // Do not use x1,y1 because x1,y1 in Area is a accessor function
  to: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Line.defaultProps = {
  left: 0,
  top: 0
};
