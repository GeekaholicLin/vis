import React from "react";
import { Curve } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, generatePropsWithDataKey } from "ultis";
  generateLegendColorsWithDataKey
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
    hidden:
      __legendSelectedItems__ === "all"
        ? false
        : __legendSelectedItems__.indexOf(dataKey) < 0
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
    hidden:
      __legendSelectedItems__ === "all"
        ? false
        : __legendSelectedItems__.indexOf(dataKey) < 0
  };
};
const hoistPropsToContext = ({ dataKey, stroke }) => {
  return generatePropsWithDataKey(
    dataKey,
    generateLegendColorsWithDataKey(dataKey, stroke)
  );
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
