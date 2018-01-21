import React from "react";
import { max } from "d3-array";
import { YAxis } from "components";
import withSubscriber from "../withSubscriber";
const mapContextToProps = ({ data, y, height, margin, yScale }) => {
  let newYScale = yScale
    .copy()
    .domain([0, max(data, y)])
    .range([height - margin.top - margin.bottom, 0]);
  return {
    scale: newYScale
  };
};
const hoistPropsToContext = props => {
  return {
    hoistingYDataKey: props.dataKey
  };
};
const skipPropsKeys = ["dataKey"];
export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  skipPropsKeys
})(YAxis);
