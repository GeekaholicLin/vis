import React from "react";
import { Pie } from "components";
import withSubscriber from "../withSubscriber";
import {
  getValuesArrByKeyOrFunc,
  generatePropsWithDataKey,
  generateLegendColorsWithDataKey
} from "ultis";
const mapContextToProps = (
  { data, width, height, __legendSelectedItems__ = "all" },
  { dataKey, nameKey }
) => {
  let isAll = __legendSelectedItems__ === "all";
  let result = [...data];
  if (!isAll) {
    result = data.map(d => {
      if (__legendSelectedItems__.indexOf(d[nameKey]) < 0) {
        return Object.assign({}, d, { [dataKey]: 0 });
      }
      return d;
    });
  }
  return {
    data: getValuesArrByKeyOrFunc(dataKey, result),
    left: width / 2,
    top: height / 2
  };
};
const hoistPropsToContext = ({ nameKey, fill }) => {
  return Object.assign({}, generateLegendColorsWithDataKey("__pie__", fill), {
    nameKey
  });
};
const skipPropsKeys = ["dataKey", "nameKey"];
export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  skipPropsKeys
})(Pie);
