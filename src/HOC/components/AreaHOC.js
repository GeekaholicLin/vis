import React from "react";
import _ from "lodash";
import { Area } from "components";
import withSubscriber from "../withSubscriber";
import {
  getChartColors,
  generatePropsWithDataKey,
  generateStackData,
  generateLegendColorsWithDataKey
} from "ultis";
import { keyWrapper } from "../../ultis/components.tool";

const DEFAULT_YAXISID = "__default__";

const mapContextToProps = (
  { data, x, y, xScale, yScale, __stackId__, __legendSelectedItems__ = "all" },
  {
    dataKey,
    stackId,
    stackValue,
    stackOrder,
    stackOffset,
    yAxisId = DEFAULT_YAXISID
  }
) => {
  let stackKeys =
    __stackId__ && !_.isNil(stackId) ? Object.keys(__stackId__[stackId]) : [];
  let intersectionKeys =
    __legendSelectedItems__ === "all"
      ? stackKeys
      : _.intersection(stackKeys, __legendSelectedItems__);
  let stackIndex = intersectionKeys.indexOf(dataKey);
  let isStack = stackIndex > -1;
  let stackDataArr = isStack
    ? generateStackData(
        data,
        intersectionKeys,
        stackValue,
        stackOrder,
        stackOffset
      )
    : data;
  let stackData = stackDataArr[stackIndex];
  let thisYScale = yScale[yAxisId];
  let isHidden =
    __legendSelectedItems__ === "all"
      ? false
      : __legendSelectedItems__.indexOf(dataKey) < 0;
  return isStack
    ? {
        data: [...stackData],
        x: d => x(d.data),
        xScale,
        yScale: thisYScale,
        y0: d => d[0],
        y1: d => d[1],
        hidden: isHidden
      }
    : {
        data,
        x,
        y: y ? y[dataKey] : keyWrapper(dataKey),
        xScale,
        yScale: thisYScale,
        y0: () => thisYScale.domain()[0],
        y1: y ? y[dataKey] : keyWrapper(dataKey),
        hidden: isHidden // needed
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
const hoistPropsToContext = ({ dataKey, stackId, fill }) => {
  let original = !_.isNil(stackId)
    ? {
        ["__stackId__"]: {
          [stackId]: {
            [dataKey]: dataKey
          }
        }
      }
    : {};
  return generatePropsWithDataKey(
    dataKey,
    Object.assign({}, original, generateLegendColorsWithDataKey(dataKey, fill))
  );
};
const skipPropsKeys = [
  "dataKey",
  "stackId",
  "groupId",
  "stackValue",
  "stackOrder",
  "stackOffset",
  "yAxisId"
];

export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  mapPropsToBrush,
  skipPropsKeys
})(Area);
