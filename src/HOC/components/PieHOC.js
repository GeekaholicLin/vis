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
  __updatedState__
}) => {
  return {
    data: getValuesArrByKeyOrFunc(dataKey, __updatedState__.data || data),
    left: width / 2,
    top: height / 2,
    fill: getChartColors(fill, chartNamespace)
  };
};
export default withSubscriber({ mapContextToProps })(Pie);
