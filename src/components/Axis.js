import React, { Component } from "react";
import * as d3Axis from "d3-axis";
import { select } from "d3-selection";
import _ from "lodash";
import PropTypes from "prop-types";
import cx from "classnames";
import { PREFIX, ORIENTATION, SCALES } from "../constant";
import Group from "./Group";
export default class Axis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      hidden,
      className,
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
    if (hidden) return null;
    let axisGenerator = d3Axis["axis" + _.capitalize(orientation)](scale);
    if (_.isFunction(axisGenerator)) {
      axisGenerator.tickArguments(ticks);
      tickValues && axisGenerator.tickValues(tickValues);
      tickFormat && axisGenerator.tickFormat(tickFormat);
      tickSize && axisGenerator.tickSize(tickSize);
      tickSizeInner && axisGenerator.tickSizeInner(tickSizeInner);
      tickSizeOuter && axisGenerator.tickSizeOuter(tickSizeOuter);
      return (
        <g
          className={cx(`${PREFIX}-axis`, className)}
          ref={node => axisGenerator(select(node))}
          {...rest}
        />
      );
    }
    return null;
  }
}
Axis.displayName = `${PREFIX}-Axis`;
Axis.propTypes = {
  hidden: PropTypes.bool,
  className: PropTypes.string,
  orientation: PropTypes.oneOf(ORIENTATION),
  scale: PropTypes.func.isRequired,
  ticks: PropTypes.array.isRequired,
  tickValues: PropTypes.array,
  tickFormat: PropTypes.func,
  tickSize: PropTypes.number,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number
};
Axis.defaultProps = {
  hidden: false,
  orientation: "bottom",
  ticks: []
};
