import React from "react";
import { Legend } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, getValueByKeyOrFunc } from "ultis";
const mapContextToProps = (
  {
    y,
    data,
    nameKey,
    __legendColors__,
    __legendSelectedItems__,
    __addedPropsToContext__
  },
  props
) => {
  let { type } = props;
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
            let selectedArr = Array.from(selectedSet);
            __addedPropsToContext__({
              __legendSelectedItems__: Object.keys(y).filter(
                key => selectedArr.indexOf(key) > -1
              )
            });
          }
        }
      : {
          // for PieChart
          items: data.map((d, i) => {
            return {
              name: getValueByKeyOrFunc(nameKey, d),
              iconProps: {
                fill: __legendColors__["__pie__"][i % data.length]
              },
              selected: true,
              label: getValueByKeyOrFunc(nameKey, d)
            };
          }),
          onLegendItemClick: ({ index, selected, name }) => {
            let items = data.map(d => getValueByKeyOrFunc(nameKey, d));
            let selectedSet = new Set(
              __legendSelectedItems__ === "all"
                ? items
                : __legendSelectedItems__
            );
            selected ? selectedSet.add(name) : selectedSet.delete(name);
            let selectedArr = Array.from(selectedSet);
            __addedPropsToContext__({
              __legendSelectedItems__: items.filter(
                key => selectedArr.indexOf(key) > -1
              )
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
