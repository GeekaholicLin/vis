import React from "react";
import _ from "lodash";
import { scaleBand } from "d3-scale";
import { Bar } from "components";
import withSubscriber from "../withSubscriber";
import {
  getChartColors,
  generatePropsWithDataKey,
  keyWrapper,
  generateStackData,
  generateLegendColorsWithDataKey
} from "ultis";

const DEFAULT_YAXISID = "__default__";

function getGroupScale(
  xScale,
  groupId,
  __groupId__,
  stackIds = [],
  intersection = "all"
) {
  let childCateKeys = !_.isNil(groupId)
    ? Object.keys(__groupId__[groupId])
    : []; //child
  // make stackIds be domain as well
  return scaleBand()
    .padding(0.05)
    .domain(
      intersection === "all"
        ? childCateKeys.concat(stackIds)
        : _.intersection(childCateKeys.concat(stackIds), intersection)
    )
    .rangeRound([0, xScale ? xScale.bandwidth() : 1]);
}
const mapContextToProps = (
  {
    data,
    x,
    y,
    xScale,
    yScale,
    __stackId__,
    __groupId__,
    __legendSelectedItems__ = "all"
  },
  {
    dataKey,
    stackId,
    groupId,
    stackValue,
    stackOrder,
    stackOffset,
    yAxisId = DEFAULT_YAXISID
  }
) => {
  //stack
  let stackKeys = !_.isNil(stackId) ? Object.keys(__stackId__[stackId]) : [];
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
    : [];
  //group
  let groupScale =
    groupId &&
    getGroupScale(
      xScale,
      groupId,
      __groupId__,
      Object.keys(__stackId__ || {}),
      __legendSelectedItems__
    );
  let bandoffset =
    y && yScale[yAxisId].bandwidth ? yScale[yAxisId].bandwidth() / 2 : 0;
  let stackData = stackDataArr[stackIndex];
  let isHidden =
    __legendSelectedItems__ === "all"
      ? false
      : __legendSelectedItems__.indexOf(dataKey) < 0;
  return isStack
    ? {
        data: [...stackData],
        left: d =>
          xScale(x(d.data)) + (groupId ? groupScale(stackId) : 0) || 9999,
        top: y ? d => yScale[yAxisId](d[1]) + bandoffset : 0,
        width: groupId
          ? groupScale.bandwidth ? groupScale.bandwidth() : 0
          : xScale.bandwidth ? xScale.bandwidth() : 1,
        height: y
          ? d => yScale[yAxisId](d[0]) - yScale[yAxisId](d[1]) - bandoffset
          : 0,
        hidden: isHidden
      }
    : groupId
      ? {
          data: data,
          left: d => groupScale(dataKey) + (xScale(x(d)) || 9999),
          top: y ? d => yScale[yAxisId](y[dataKey](d)) + bandoffset : 0,
          width: groupScale.bandwidth ? groupScale.bandwidth() : 0,
          height: y
            ? d => innerHeight - yScale[yAxisId](y[dataKey](d)) - bandoffset
            : 0,
          hidden: isHidden
        }
      : {
          data: data,
          left: d => xScale(x(d)) || 9999,
          top: y ? d => yScale[yAxisId](y[dataKey](d)) + bandoffset : 0,
          width: xScale.bandwidth ? xScale.bandwidth() : 0,
          height: y
            ? d => innerHeight - yScale[yAxisId](y[dataKey](d)) - bandoffset
            : 0,
          hidden: isHidden
        };
};
const mapPropsToBrush = (
  brushContext,
  brushProps,
  __chartProviderContext__,
  selfProps
) => {
  let {
    x,
    y,
    data,
    xScale,
    yScale,
    height: brushHeight,
    __groupId__,
    __stackId__
  } = brushContext;
  let { __legendSelectedItems__ = "all" } = __chartProviderContext__;
  let {
    dataKey,
    groupId,
    stackId,
    stackValue,
    stackOrder,
    stackOffset,
    yAxisId = DEFAULT_YAXISID
  } = selfProps;
  let brushYScale = yScale[yAxisId].copy().range([brushHeight, 0]);
  let stackKeys = !_.isNil(stackId) ? Object.keys(__stackId__[stackId]) : [];
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
    : [];
  //group
  let groupScale =
    groupId &&
    getGroupScale(
      xScale,
      groupId,
      __groupId__,
      Object.keys(__stackId__ || {}),
      __legendSelectedItems__
    );
  let brushBandoffset =
    y && brushYScale.bandwidth ? brushYScale.bandwidth() / 2 : 0;
  let isHidden =
    __legendSelectedItems__ === "all"
      ? false
      : __legendSelectedItems__.indexOf(dataKey) < 0;
  return isStack
    ? {
        data: [...stackDataArr[stackIndex]],
        left: d =>
          xScale(x(d.data)) + (groupId ? groupScale(stackId) : 0) || 9999,
        top: y ? d => brushYScale(d[1]) + brushBandoffset : 0,
        width: groupId
          ? groupScale.bandwidth ? groupScale.bandwidth() : 0
          : xScale.bandwidth ? xScale.bandwidth() : 1,
        height: y
          ? d => brushYScale(d[0]) - brushYScale(d[1]) - brushBandoffset
          : 0,
        hidden: isHidden
      }
    : groupId
      ? {
          left: d => groupScale(dataKey) + xScale(x(d)),
          top: y ? d => brushYScale(y[dataKey](d)) + brushBandoffset : 0,
          width: groupScale.bandwidth ? groupScale.bandwidth() : 0,
          height: y
            ? d => brushHeight - brushYScale(y[dataKey](d)) - brushBandoffset
            : 0,
          hidden: isHidden
        }
      : {
          left: d => xScale(x(d)),
          top: y ? d => brushYScale(y[dataKey](d)) + brushBandoffset : 0,
          width: xScale.bandwidth ? xScale.bandwidth() : 0,
          height: y
            ? d => brushHeight - brushYScale(y[dataKey](d)) - brushBandoffset
            : 0,
          hidden: isHidden
        };
};
const hoistPropsToContext = ({ dataKey, stackId, groupId, fill }) => {
  let original = !_.isNil(stackId)
    ? {
        ["__stackId__"]: {
          [stackId]: {
            [dataKey]: dataKey
          }
        }
      }
    : !_.isNil(groupId)
      ? {
          __groupId__: {
            [groupId]: {
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
})(Bar);
