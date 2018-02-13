import React from "react";
import { Curve } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, generatePropsWithDataKey } from "ultis";
const DEFAULT_YAXISID = "__default__";

const mapContextToProps = (context, { dataKey, yAxisId = DEFAULT_YAXISID }) => {
  let { data, x, y, xScale, yScale } = context;
  return {
    data: data.filter(
      d =>
        xScale(x(d)) !== undefined &&
        yScale[yAxisId](y[dataKey](d)) !== undefined
    ), //fix bug when zoom category scale line
    x,
    y: y[dataKey],
    xScale,
    yScale: yScale[yAxisId]
  };
};
const mapPropsToBrush = (
  brushContext,
  {},
  {},
  { yAxisId = DEFAULT_YAXISID }
) => {
  let { xScale, yScale, height: brushHeight } = brushContext;
  return {
    xScale: xScale.copy(),
    yScale: yScale[yAxisId].copy().range([brushHeight, 0])
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
