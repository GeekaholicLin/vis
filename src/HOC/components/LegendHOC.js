import React from "react";
import { Legend } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValueByKeyOrFunc } from "ultis";
const mapContextToProps = ({
  data,
  fill,
  nameKey = "name",
  chartNamespace,
  __updateStateInContext__,
  __updatedState__
}) => {
    __legendColors__,
                fill: __legendColors__[key]
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
      let updatedData = __updatedState__.data || data;
      let result = [...updatedData];
      result[index] = selected ? data[index] : {};
      __updateStateInContext__({
        data: [...result]
      });
    }
  };
};
const shouldRenderOutside = true;
export default withSubscriber({ mapContextToProps, shouldRenderOutside })(
  Legend
);
