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
      hidden,
      ...rest
    } = this.props;
    let lineGenerator = line()
      .x(d => xScale(x(d)))
      .y(d => yScale(y(d)));
    let bandOffsetX = xScale.bandwidth ? xScale.bandwidth() / 2 : 0; //support bandscale
    let bandOffsetY = yScale.bandwidth ? yScale.bandwidth() / 2 : 0; //support bandscale
    defined && lineGenerator.defined(defined);
    curve && lineGenerator.curve(curve);
    let d = lineGenerator(data);
    return /NaN/.test(d) || hidden ? null : (
      <path
        className={cx(`${PREFIX}-curve`, className)}
        d={d}
        transform={`translate(${left ? left : bandOffsetX},${
          top ? top : bandOffsetY
        })`}
        {...rest}
      />
    );
  }
}
Curve.displayName = `${PREFIX}Curve`;
Curve.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func.isRequired, //accessor func
  y: PropTypes.func.isRequired,
  defined: PropTypes.func,
  curve: PropTypes.func,
  hidden: PropTypes.bool,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Curve.defaultProps = {
  fill: "none",
  hidden: false,
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top", "stroke", "strokeWidth"])
};
