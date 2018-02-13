import React from "react";
import { Grid } from "components";
import withSubscriber from "../withSubscriber";
import { keyWrapper } from "ultis";
const DEFAULT_YAXISID = "__default__";

const mapContextToProps = (
  { xScale, width, height, margin, yScale },
  { grid, yAxisId = DEFAULT_YAXISID }
) => {
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;
  return {
    xScale: xScale.copy(),
    yScale: yScale[yAxisId].copy(),
    width: ["auto", "row"].indexOf(grid) > -1 ? innerWidth : 0,
    height: ["auto", "column"].indexOf(grid) > -1 ? innerHeight : 0
  };
};
export default withSubscriber({
  mapContextToProps
})(Grid);
