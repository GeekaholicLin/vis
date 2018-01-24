import React from "react";
import { max, extent } from "d3-array";
import { Curve } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, generatePropsWithDataKey } from "ultis";

const mapContextToProps = (context, { dataKey }) => {
  let { data, x, y, xScale, yScale } = context;
  return {
    data,
    x,
    y: y[dataKey],
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
const hoistPropsToContext = ({ dataKey }) => {
  return generatePropsWithDataKey(dataKey);
};
const skipPropsKeys = ["dataKey"];
export default withSubscriber({
  mapContextToProps,
  skipPropsKeys,
  hoistPropsToContext,
  mapPropsToBrush
})(Curve);
