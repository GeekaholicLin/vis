import React from "react";
import { max, extent } from "d3-array";
import { Marker } from "components";
import withSubscriber from "../withSubscriber";
import { getChartColors, generatePropsWithDataKey } from "ultis";

const mapContextToProps = (context, { dataKey }) => {
  let { xScale, yScale, width, height, margin } = context;
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;
  return {
    xScale,
    yScale,
    width,
    height,
    innerHeight,
    innerWidth
  };
};

export default withSubscriber({
  mapContextToProps
})(Marker);
