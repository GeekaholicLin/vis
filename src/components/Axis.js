import React, { Component } from "react";
import d3Axis from "d3-axis";
import _ from "lodash";
import PropTypes from "prop-types";
import { PREFIX, ORIENTATION, SCALES } from "../constant";
import Group from "./Group";
//TODO:
export default class Axis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      orientation,
      scale,
      ticks,
      tickValues,
      tickFormat,
      tickSize,
      tickSizeInner,
      tickSizeOuter,
      tickPadding
    } = this.props;
    let axisGenerator = d3Axis["axis" + _.capitalize(orientation)];
    if (_.isFunction(axisGenerator)) {
      axisGenerator(scale).tickArguments(ticks);
      tickValues && axisGenerator.tickValues(tickValues);
      tickFormat && axisGenerator.tickFormat(tickFormat);
      tickSize && axisGenerator.tickSize(tickSize);
      tickSizeInner && axisGenerator.tickSizeInner(tickSizeInner);
      tickSizeOuter && axisGenerator.tickSizeOuter(tickSizeOuter);
      return <g className={className} ref={node => axisGenerator(node)} />;
    }
    return null;
  }
}
Axis.displayName = `${PREFIX}-Axis`;
Axis.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(ORIENTATION),
  scale: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  ticks: PropTypes.array,
  tickValues: PropTypes.arr,
  tickFormat: PropTypes.func,
  tickSize: PropTypes.number,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number
};
Axis.propTypes = {
  className: `${PREFIX}-axis`,
  orientation: "bottom"
};
