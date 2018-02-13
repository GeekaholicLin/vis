import React from "react";
import _ from "lodash";
import { Area } from "components";
import withSubscriber from "../withSubscriber";
import {
  getChartColors,
  generatePropsWithDataKey,
  generateStackData
} from "ultis";
import { keyWrapper } from "../../ultis/components.tool";

const DEFAULT_YAXISID = "__default__";

const mapContextToProps = (
  { data, x, y, xScale, yScale, __stackId__ },
  {
    dataKey,
    stackId,
    stackValue,
    stackOrder,
    stackOffset = "expand",
    yAxisId = DEFAULT_YAXISID
  }
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
        yScale: yScale[yAxisId],
        y0: d => d[0],
        y1: d => d[1]
      }
    : {
        data,
        x,
        y: y ? y[dataKey] : keyWrapper(dataKey),
        xScale,
        yScale: yScale[yAxisId],
        y0: () => 0,
        y1: y ? y[dataKey] : keyWrapper(dataKey)
      };
};
const mapPropsToBrush = (brushContext, {}, {}, { yAxisId }) => {
  let { xScale, yScale, height: brushHeight } = brushContext;
  return {
    xScale: xScale.copy(),
    yScale: yScale[yAxisId || DEFAULT_YAXISID].copy().range([brushHeight, 0])
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
