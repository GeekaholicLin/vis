import React from "react";
import { Legend } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValueByKeyOrFunc } from "ultis";
const mappingStateToProps = ({
  data,
  width,
  height,
  fill,
  nameKey = "name",
  label,
  chartNamespace,
  __updateBroadcast__,
  __updatedProps__
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
      let updatedData = __updatedProps__.data || data;
      let result = [...updatedData];
      result[index] = selected ? data[index] : 0;
      __updateBroadcast__({
        data: [...result]
      });
    }
  };
};
export default withSubscriber(mappingStateToProps, true)(Legend);
