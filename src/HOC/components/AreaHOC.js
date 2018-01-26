import React from "react";
import _ from "lodash";
import { stack, area } from "d3-shape";
import { max, extent } from "d3-array";
import { Area } from "components";
import withSubscriber from "../withSubscriber";
import {
  getChartColors,
  generatePropsWithDataKey,
  generateStackData
} from "ultis";
import { keyWrapper } from "../../ultis/components.tool";

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
    __stackId__,
    chartNamespace
  },
  { dataKey, stackId, stackValue, stackOrder, stackOffset = "expand" }
) => {
  let stackKeys =
    __stackId__ && !_.isNil(stackId) ? Object.keys(__stackId__[stackId]) : [];
  let stackIndex = stackKeys.indexOf(dataKey);
  let isStack = stackIndex > -1;
  let stackDataArr = isStack
    ? generateStackData(data, stackKeys, stackValue, stackOrder, stackOffset)
    : data;
  return isStack
    ? {
        data: [...stackDataArr[stackIndex]],
        x: d => x(d.data),
        xScale,
        yScale,
        y0: d => d[0],
        y1: d => d[1]
      }
    : {
        data,
        x,
        y: y ? y[dataKey] : keyWrapper(dataKey),
        xScale,
        yScale,
        y0: () => 0,
        y1: y ? y[dataKey] : keyWrapper(dataKey)
      };
};
const mapPropsToBrush = (brushContext, brushProps) => {
  let { xScale, yScale, height: brushHeight } = brushContext;
  return {
    xScale: xScale.copy(),
    yScale: yScale.copy().range([brushHeight, 0])
  };
};
const hoistPropsToContext = ({ dataKey, stackId }) => {
  let original = !_.isNil(stackId)
    ? {
        ["__stackId__"]: {
          [stackId]: {
            [dataKey]: dataKey
          }
        }
      }
    : {};
  return generatePropsWithDataKey(dataKey, original);
};
const skipPropsKeys = [
  "dataKey",
  "stackId",
  "groupId",
  "stackValue",
  "stackOrder",
  "stackOffset"
];

export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  mapPropsToBrush,
  skipPropsKeys
})(Area);
