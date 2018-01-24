import React from "react";
import { max, extent } from "d3-array";
import { Area } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, generatePropsWithDataKey } from "ultis";

const mapContextToProps = (
  {
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
  },
  { dataKey, index, stackKeys }
) => {
  return {
    data,
    x,
    y: y[dataKey],
    xScale,
    yScale,
    y0: () => 0,
    y1: y[dataKey]
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
const skipPropsKeys = ["dataKey", "index", "stackKeys", "stackName"];

export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  mapPropsToBrush,
  skipPropsKeys
})(Area);
