import React from "react";
import { Zoom } from "components";
import { extent, max } from "d3-array";
import withSubscriber from "../withSubscriber";
import { addInvertForScale } from "ultis";
const mapContextToProps = (context, props) => {
  let {
    width,
    xScale,
    x,
    data,
    height,
    margin,
    __addedPropsToContext__
  } = context;
  let transformedXScale = xScale.copy();
  let isOridalScale = !transformedXScale.invert && transformedXScale.bandwidth;
  return {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    dataLoaded: data.length > 0, // it is helpful for async data
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
          xScale: transformedXScale.copy().domain(transformedDomain) //override
        });
      }
    },
    afterMounted: instance =>
      __addedPropsToContext__({
        __zoomInstance__: instance //export instance for brush to update transform
      })
  };
};
export default withSubscriber({ mapContextToProps })(Zoom);
