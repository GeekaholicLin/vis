import React from "react";
import _ from "lodash";
import { scaleBand } from "d3-scale";
import { Bar } from "components";
import withSubscriber from "../withSubscriber";
import {
  getChartColors,
  generatePropsWithDataKey,
  keyWrapper,
  generateStackData
} from "ultis";

function getGroupScale(xScale, groupId, __groupId__) {
  let childCateKeys = !_.isNil(groupId)
    ? Object.keys(__groupId__[groupId])
    : []; //child
  return scaleBand()
    .padding(0.05)
    .domain(childCateKeys)
    .rangeRound([0, xScale ? xScale.bandwidth() : 1]);
}
const mapContextToProps = (
  { data, x, y, xScale, yScale, __stackId__, __groupId__ },
  { dataKey, stackId, groupId, stackValue, stackOrder, stackOffset = "expand" }
) => {
  //stack
  let stackKeys = !_.isNil(stackId) ? Object.keys(__stackId__[stackId]) : [];
  let stackIndex = stackKeys.indexOf(dataKey);
  let isStack = stackIndex > -1;
  let stackDataArr = isStack
    ? generateStackData(data, stackKeys, stackValue, stackOrder, stackOffset)
    : [];

  //group
  let groupScale = groupId && getGroupScale(xScale, groupId, __groupId__);
  return isStack
    ? {
        data: [...stackDataArr[stackIndex]],
        left: d => xScale(x(d.data)) || 9999,
        top: y ? d => yScale(d[1]) : 0,
        width: xScale.bandwidth ? xScale.bandwidth() : 1,
        height: y ? d => yScale(d[0]) - yScale(d[1]) : 0
      }
    : groupId
      ? {
          data,
          left: d => groupScale(dataKey) + (xScale(x(d)) || 9999),
          top: y ? d => yScale(y[dataKey](d)) : 0,
          width: groupScale.bandwidth ? groupScale.bandwidth() : 0,
          height: y ? d => innerHeight - yScale(y[dataKey](d)) : 0
        }
      : {
          data: data,
          left: d => xScale(x(d)) || 9999,
          top: y ? d => yScale(y[dataKey](d)) : 0,
          width: xScale.bandwidth ? xScale.bandwidth() : 0,
          height: y ? d => innerHeight - yScale(y[dataKey](d)) : 0
        };
};
const mapPropsToBrush = (brushContext, brushProps, {}, selfProps) => {
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
  let {
    dataKey,
    groupId,
    stackId,
    stackValue,
    stackOrder,
    stackOffset
  } = selfProps;
  let brushYScale = yScale.copy().range([brushHeight, 0]);
  let stackKeys = !_.isNil(stackId) ? Object.keys(__stackId__[stackId]) : [];
  let stackIndex = stackKeys.indexOf(dataKey);
  let isStack = stackIndex > -1;
  let stackDataArr = isStack
    ? generateStackData(data, stackKeys, stackValue, stackOrder, stackOffset)
    : [];
  //group
  let groupScale = groupId && getGroupScale(xScale, groupId, __groupId__);

  return isStack
    ? {
        data: [...stackDataArr[stackIndex]],
        left: d => xScale(x(d.data)) || 9999,
        top: y ? d => brushYScale(d[1]) : 0,
        width: xScale.bandwidth ? xScale.bandwidth() : 1,
        height: y ? d => brushYScale(d[0]) - brushYScale(d[1]) : 0
      }
    : groupId
      ? {
          left: d => groupScale(dataKey) + xScale(x(d)),
          top: y ? d => brushYScale(y[dataKey](d)) : 0,
          width: groupScale.bandwidth ? groupScale.bandwidth() : 0,
          height: y ? d => brushHeight - brushYScale(y[dataKey](d)) : 0
        }
      : {
          left: d => xScale(x(d)),
          top: y ? d => brushYScale(y[dataKey](d)) : 0,
          width: xScale.bandwidth ? xScale.bandwidth() : 0,
          height: y ? d => brushHeight - brushYScale(y[dataKey](d)) : 0
        };
  return {
    xScale: xScale.copy(),
    yScale: yScale.copy().range([brushHeight, 0])
  };
};
const hoistPropsToContext = ({ dataKey, stackId, groupId }) => {
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
})(Bar);
