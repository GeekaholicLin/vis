import React from "react";
import { Legend } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValueByKeyOrFunc } from "ultis";
const mapContextToProps = (
  {
    y,
    data,
    fill = ["black"],
    nameKey = "name",
    __legendColors__,
    __legendSelectedItems__,
    chartNamespace,
    __addedPropsToContext__
  },
  props
) => {
  let { type = "data" } = props;
  let options =
    type === "key"
      ? {
          items: Object.keys(y).map((key, i) => {
            return {
              name: key,
              iconProps: {
                fill: __legendColors__[key]
              },
              selected: true,
              label: key
            };
          }),
          onLegendItemClick: ({ selected, name }) => {
            let selectedSet = new Set(
              __legendSelectedItems__ === "all"
                ? Object.keys(y)
                : __legendSelectedItems__
            );
            selected ? selectedSet.add(name) : selectedSet.delete(name);
            __addedPropsToContext__({
              __legendSelectedItems__: Array.from(selectedSet)
            });
          }
        }
      : {
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
  return Object.assign({}, options, props);
};
const hoistPropsToContext = ({ items }, { data = [] }) => {
  return {
    __legendSelectedItems__: items
      ? items.reduce((arr, item, i) => {
          item.selected && arr.push(item.name);
          return arr;
        }, [])
      : "all"
  }; // The default are all the keys of data
};

const shouldRenderOutside = true;
const skipPropsKeys = ["type"];
export default withSubscriber({
  mapContextToProps,
  shouldRenderOutside,
  skipPropsKeys,
  hoistPropsToContext
})(Legend);
