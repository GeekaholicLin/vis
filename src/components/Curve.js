import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { line } from "d3-shape";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
export default class Curve extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
      left,
      top,
      xScale,
      yScale,
      x,
      y,
      defined,
      curve,
      symbolGenerator,
      ...rest
    } = this.props;
    let lineGenerator = line()
      .x(d => xScale(x(d)))
      .y(d => yScale(y(d)));
    defined && lineGenerator.defined(defined);
    curve && lineGenerator.curve(curve);
    return (
      <path
        className={cx(`${PREFIX}-curve`, className)}
        d={lineGenerator(data)}
        transform={`translate(${left},${top})`}
        {...rest}
      />
    );
  }
}
Curve.displayName = `${PREFIX}Curve`;
Curve.PropTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func.isRequired, //accessor func
  y: PropTypes.func.isRequired,
  defined: PropTypes.func,
  curve: PropTypes.func,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Curve.defaultProps = {
  fill: "none",
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top", "stroke", "strokeWidth"])
};
