import React from "react";
import { Zoom } from "components";
import { extent, max } from "d3-array";
import withSubscriber from "../withSubscriber";
import { addInvertForScale, getOrinalRange } from "ultis";

const mapContextToProps = props => {
  let {
    width,
    xScale,
    x,
    data,
    height,
    margin,
    __addedPropsToContext__
  } = props;
  let transformedXScale = xScale.copy();
  let isOridalScale = !transformedXScale.invert && transformedXScale.bandwidth;

  return {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    dataLength: data.length, //only flag whether init or update zoomBehavior
    listener: {
      "zoom.zoomHOC": instance => () => {
        let { transform } = instance;
        let transformedDomain = isOridalScale
          ? addInvertForScale(xScale.copy()).invertExtent.apply(
              null,
              xScale
                .copy()
                .range()
                .map(transform.invertX, transform)
            )
          : transform.rescaleX(xScale).domain();
        __addedPropsToContext__({
          xScale: transformedXScale.copy().domain(transformedDomain)
        });
      }
    }
  };
};
export default withSubscriber({ mapContextToProps })(Zoom);
