import React, { Component } from "react";
import { select } from "d3-selection";
import _ from "lodash";
import PropTypes from "prop-types";
import cx from "classnames";
import {
  PREFIX,
  AXIS_ORIENTATION_MAP,
  SCALES,
  ALL_COMMON_PROPTYPES,
  ALL_DEFAULT_PROPS
} from "../constant";
import Group from "./Group";
export default class D3Axis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      left,
      top,
      orientation,
      scale,
      ticks,
      tickValues,
      tickFormat,
      tickSize,
      tickSizeInner,
      tickSizeOuter,
      tickPadding,
      ...rest
    } = this.props;
    let axisGenerator = AXIS_ORIENTATION_MAP[orientation](scale);
    if (_.isFunction(axisGenerator)) {
      axisGenerator.tickArguments(ticks);
      tickValues && axisGenerator.tickValues(tickValues);
      tickFormat && axisGenerator.tickFormat(tickFormat);
      !_.isNil(tickSize) && axisGenerator.tickSize(tickSize);
      !_.isNil(tickSizeInner) && axisGenerator.tickSizeInner(tickSizeInner);
      !_.isNil(tickSizeOuter) && axisGenerator.tickSizeOuter(tickSizeOuter);
      !_.isNil(tickPadding) && axisGenerator.tickPadding(tickPadding);
      return (
        <g
          className={cx(`${PREFIX}-d3-axis`, className)}
          ref={node => axisGenerator(select(node))}
          transform={`translate(${left},${top})`}
          {...rest}
        />
      );
    }
    return null;
  }
}
D3Axis.displayName = `${PREFIX}D3Axis`;
D3Axis.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(Object.keys(AXIS_ORIENTATION_MAP)),
  scale: PropTypes.func,
  ticks: PropTypes.array,
  tickValues: PropTypes.array,
  tickFormat: PropTypes.func,
  tickSize: PropTypes.number,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
D3Axis.defaultProps = {
  orientation: "bottom",
  ticks: [],
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
