import React from "react";
import { Legend } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValueByKeyOrFunc } from "ultis";
const mapContextToProps = ({
  data,
  width,
  height,
  fill,
  nameKey = "name",
  label,
  chartNamespace,
  __updateStateInContext__,
  __updated__
}) => {
  return {
    items: data.map((d, i) => {
      return {
        name: getValueByKeyOrFunc(nameKey, d),
        iconProps: {
          fill: getChartColors(fill, chartNamespace)[i % fill.length]
        },
        selected: true,
        label: getValueByKeyOrFunc(nameKey, d)
      };
    }),
    onLegendItemClick: ({ index, selected }) => {
      let updatedData = __updated__.data || data;
      let result = [...updatedData];
      result[index] = selected ? data[index] : {};
      __updateStateInContext__({
        data: [...result]
      });
    }
  };
};
export default withSubscriber(mapContextToProps, true)(Legend);
