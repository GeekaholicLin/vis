import React from "react";
import { Pie } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValuesArrByKeyOrFunc } from "ultis";
const mapContextToProps = ({
  data,
  fill,
  width,
  height,
  dataKey = "value",
  chartNamespace,
  __updated__
}) => {
  return {
    data: getValuesArrByKeyOrFunc(dataKey, __updated__.data || data),
    left: width / 2,
    top: height / 2,
    fill: getChartColors(fill, chartNamespace)
  };
};
export default withSubscriber(mapContextToProps)(Pie);
