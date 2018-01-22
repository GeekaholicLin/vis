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
  console.log("mapContextToProps");
  return {
    data,
    x,
    y,
    xScale,
    yScale,
    y0: () => 0,
    y1: y,
    fill: getChartColors(fill, chartNamespace)
  };
};
const mapPropsToBrush = (brushContext, brushProps) => {
  console.log("mapPropsToBrush");
  let { xScale, yScale, height: brushHeight } = brushContext;
  return {
    xScale: xScale.copy(),
    yScale: yScale.copy().range([brushHeight, 0])
  };
};
export default withSubscriber({ mapContextToProps, mapPropsToBrush })(Area);
