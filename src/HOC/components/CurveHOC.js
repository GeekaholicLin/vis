import React from "react";
import { max, extent } from "d3-array";
import { Curve } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors } from "ultis";

const mapContextToProps = ({ data, x, y, xScale, yScale }) => {
  return {
    data,
    x,
    y,
    xScale,
    yScale
  };
};
const mapPropsToBrush = (brushContext, brushProps) => {
  let { xScale, yScale, height: brushHeight } = brushContext;
  return {
    xScale: xScale.copy(),
    yScale: yScale.copy().range([brushHeight, 0])
  };
};
export default withSubscriber({ mapContextToProps, mapPropsToBrush })(Curve);
