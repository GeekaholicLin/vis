import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import cx from "classnames";
import { area } from "d3-shape";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
export default class Area extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
      left,
      top,
      x,
      x0,
      x1,
      y,
      y0,
      y1,
      defined,
      curve,
      xScale,
      yScale,
      ...rest
    } = this.props;
    const areaGenerator = area();
    x && areaGenerator.x(d => xScale(x(d)));
    x0 && areaGenerator.x0(d => xScale(x0(d)));
    x1 && areaGenerator.x1(d => xScale(x1(d)));
    y && areaGenerator.y(d => yScale(y(d)));
    y0 && areaGenerator.y0(d => yScale(y0(d)));
    y1 && areaGenerator.y1(d => yScale(y1(d)));
    defined && areaGenerator.defined(defined);
    curve && areaGenerator.curve(curve);
    return (
      <path
        className={cx(`${PREFIX}-area`, className)}
        d={areaGenerator(data)}
        transform={`translate(${left},${top})`}
        {...rest}
      />
    );
  }
}
Area.displayName = `${PREFIX}Area`;
Area.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  x: PropTypes.func, //accessor
  x0: PropTypes.func,
  x1: PropTypes.func,
  y: PropTypes.func,
  y0: PropTypes.func,
  y1: PropTypes.func,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  defined: PropTypes.func,
  curve: PropTypes.func,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Area.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"]),
  stroke: "none"
};
