import React from "react";
import { extent } from "d3-array";
import { XAxis } from "components";
import withSubscriber from "../withSubscriber";
import { keyWrapper } from "ultis";

const mapContextToProps = ({ height, margin, xScale }) => {
  return {
    scale: xScale, // must to map this because scale is copied in hoistPropsToContext
    top: height - margin.top - margin.bottom
  };
};
const hoistPropsToContext = (
  { scale, domain, range, dataKey },
  { data, width, margin }
) => {
  let xScale = scale
    .copy()
    .domain(
      domain ||
        (scale.bandwidth && data.map(keyWrapper(dataKey))) ||
        extent(data, keyWrapper(dataKey))
    )
    .range(range || [0, width - margin.left - margin.right]);
  return {
    x: keyWrapper(dataKey),
    xScale
  };
};
const mapPropsToBrush = brushContext => {
  let { xScale, height: brushHeight } = brushContext;
  return {
    scale: xScale.copy(),
    top: brushHeight
  };
};
const skipPropsKeys = ["dataKey", "scale", "domain", "range"];
const componentRenderSide = "outer";

export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  skipPropsKeys,
  componentRenderSide,
  mapPropsToBrush
})(XAxis);
