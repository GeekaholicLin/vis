import React from "react";
import { Zoom } from "components";
import { extent, max } from "d3-array";
import withSubscriber from "../withSubscriber";
import { addInvertForScale, getOrinalRange } from "ultis";

const mapContextToProps = ({ width, xScale, x, data, height, margin }) => {
  return {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    listener: {
      "zoom.zoomHOC": instance => () => {}
    }
  };
};
export default withSubscriber({ mapContextToProps })(Zoom);
