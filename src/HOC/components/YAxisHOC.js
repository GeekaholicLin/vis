import React from "react";
import { max } from "d3-array";
import { YAxis } from "components";
import withSubscriber from "../withSubscriber";
import { keyWrapper } from "ultis";

const mapContextToProps = ({ data, y, height, margin, yScale }) => {
  return {
    scale: yScale // must to map this because scale is copied in hoistPropsToContext
  };
};
const hoistPropsToContext = (
  { scale, domain, range, dataKey },
  { data, height, margin }
) => {
  let yScale = scale
    .copy()
    .domain(domain || [0, max(data, keyWrapper(dataKey))])
    .range(range || [height - margin.top - margin.bottom, 0]);
  return {
    y: keyWrapper(dataKey),
    yScale
  };
};
const skipPropsKeys = ["dataKey", "scale", "domain", "range"];
const componentRenderSide = "outer";

export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  skipPropsKeys,
  componentRenderSide
})(YAxis);
