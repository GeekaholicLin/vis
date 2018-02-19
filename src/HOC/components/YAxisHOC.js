import React from "react";
import { max } from "d3-array";
import { YAxis } from "components";
import withSubscriber from "../withSubscriber";
import { keyWrapper, generatePropsWithDataKey } from "ultis";

const DEFAULT_YAXISID = "__default__";
const mapContextToProps = (
  { yScale, width, margin },
  { orientation, yAxisId = DEFAULT_YAXISID }
) => {
  let innerWidth = width - margin.left - margin.right;
  return {
    scale: yScale[yAxisId], // must to map this because scale is copied in hoistPropsToContext
    left: orientation === "right" ? innerWidth : 0
  };
};
const hoistPropsToContext = (
  { scale, domain, range, dataKey, yAxisId = DEFAULT_YAXISID },
  { data, height, margin }
) => {
  //if do not have dataKey, must pass domain to construct yScale
  let yScale = scale
    .copy()
    .domain(
      domain ||
        (scale.bandwidth && data.map(keyWrapper(dataKey))) || [
          0,
          max(data, keyWrapper(dataKey))
        ]
    )
    .range(range || [height - margin.top - margin.bottom, 0]);
  return generatePropsWithDataKey(dataKey, {
    yScale: {
      [yAxisId]: yScale
    }
  });
};
const skipPropsKeys = ["dataKey", "scale", "domain", "range", "yAxisId"];
const componentRenderSide = "outer";

export default withSubscriber({
  mapContextToProps,
  hoistPropsToContext,
  skipPropsKeys,
  componentRenderSide
})(YAxis);
