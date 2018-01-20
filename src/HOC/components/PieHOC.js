import React from "react";
import { Pie } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValuesArrByKeyOrFunc } from "ultis";
const mappingStateToProps = ({
  data,
  fill,
  width,
  height,
  dataKey = "value",
  chartNamespace,
  __updatedProps__
}) => {
  return {
    data: getValuesArrByKeyOrFunc(dataKey, __updatedProps__.data || data),
    left: width / 2,
    top: height / 2,
    fill: getChartColors(fill, chartNamespace)
  };
};
export default withSubscriber(mappingStateToProps)(Pie);
