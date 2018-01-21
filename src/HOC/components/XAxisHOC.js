import React from "react";
import { extent } from "d3-array";
import { XAxis } from "components";
import withSubscriber from "../withSubscriber";
const mapContextToProps = ({ data, x, width, height, margin, xScale }) => {
  let newXScale = xScale
    .copy()
    .domain(extent(data, x))
    .range([0, width - margin.left - margin.right]);
  return {
    scale: newXScale,
    top: height - margin.top - margin.bottom
  };
};
export default withSubscriber(mapContextToProps)(XAxis);
