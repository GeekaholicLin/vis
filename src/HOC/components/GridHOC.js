import React from "react";
import { max } from "d3-array";
import { Grid } from "components";
import withSubscriber from "../withSubscriber";
import { keyWrapper } from "ultis";

const mapContextToProps = (
  { xScale, width, height, margin, yScale },
  { grid }
) => {
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;
  return {
    xScale: xScale.copy(),
    yScale: yScale.copy(),
    width: ["auto", "row"].indexOf(grid) > -1 ? innerWidth : 0,
    height: ["auto", "column"].indexOf(grid) > -1 ? innerHeight : 0
  };
};
export default withSubscriber({
  mapContextToProps
})(Grid);
