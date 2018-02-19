import React from "react";
import { Curve } from "components";
import withSubscriber from "../withSubscriber";
import {
  getChartColors,
  generatePropsWithDataKey,
  generateLegendColorsWithDataKey
} from "ultis";
const DEFAULT_YAXISID = "__default__";

const mapContextToProps = (context, { dataKey, yAxisId = DEFAULT_YAXISID }) => {
  let {
    data,
    x,
    y,
    xScale,
    yScale,
    __updatedState__ = {},
    __legendSelectedItems__ = "all"
  } = context;
  return {
    data: data.filter(
      d =>
        xScale(x(d)) !== undefined &&
        yScale[yAxisId](y[dataKey](d)) !== undefined //fix bug when zoom category scale line
    ),
    x,
    y: y[dataKey],
    xScale,
    yScale: yScale[yAxisId],
    hidden:
      __legendSelectedItems__ === "all"
        ? false
        : __legendSelectedItems__.indexOf(dataKey) < 0
  };
};
const mapPropsToBrush = (
  brushContext,
  {},
  __chartProviderContext__,
  { yAxisId = DEFAULT_YAXISID, dataKey }
) => {
  let { xScale, yScale, height: brushHeight } = brushContext;
  let {
    data,
    x,
    y,
    __legendSelectedItems__ = "all"
  } = __chartProviderContext__;
  return {
    data: data,
    xScale: xScale.copy(),
    yScale: yScale[yAxisId].copy().range([brushHeight, 0]),
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
};
const skipPropsKeys = ["dataKey", "yAxisId"];
export default withSubscriber({
  mapContextToProps,
  skipPropsKeys,
  hoistPropsToContext,
  mapPropsToBrush
})(Curve);
