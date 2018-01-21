import React from "react";
import { max, extent } from "d3-array";
import { Area } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors } from "ultis";

const mapContextToProps = ({
  width,
  height,
  margin,
  data,
  x,
  y,
  fill,
  xScale,
  yScale,
  hoistingXDataKey,
  chartNamespace
}) => {
  let newXScale = xScale
    .copy()
    .domain(extent(data, x))
    .range([0, width - margin.left - margin.right]);
  let newYScale = yScale
    .copy()
    .domain([0, max(data, y)])
    .range([height - margin.top - margin.bottom, 0]);
  return {
    data,
    x,
    y,
    xScale: newXScale,
    yScale: newYScale,
    y0: () => 0,
    y1: y,
    fill: getChartColors(fill, chartNamespace)
  };
};
export default withSubscriber({ mapContextToProps })(Area);
