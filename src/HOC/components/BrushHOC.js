import React from "react";
import { Brush } from "components";
import { event as currentEvent, select } from "d3-selection";
import { zoomIdentity } from "d3-zoom";
import withSubscriber from "../withSubscriber";
import { BRUSHCHANNEL } from "constant";
import { addInvertForScale } from "ultis";

const mapContextToProps = ({
  __brushProviderProps__,
  __chartProviderContext__,
  ...brushContext
}) => {
  let { children, xScale, width, margin } = brushContext;
  let innerWidth = width - margin.left - margin.right;
  let {
    xScale: transformedXScale,
    __addedPropsToContext__,
    data,
    __zoomInstance__
  } = __chartProviderContext__;
  let transformedDomain = transformedXScale.domain();
  let domainLength = transformedDomain.length;
  let originalLength = xScale.domain().length;
  let bandwidth = 0;
  let paddingInner = 0;
  let step = 0;
  let isFirst = transformedDomain[0] === xScale.domain()[0];
  let isLast =
    transformedDomain[domainLength - 1] === xScale.domain()[originalLength - 1];
  if (xScale.bandwidth) {
    bandwidth = xScale.bandwidth();
    paddingInner = xScale.paddingInner();
    step = xScale.step();
  }
  let r1 = isFirst ? 0 : xScale(transformedDomain[0]) - paddingInner * step;
  let r2 = isLast
    ? innerWidth
    : xScale(transformedDomain[domainLength - 1]) +
      bandwidth +
      paddingInner * step;
  let transformedRange = [isNaN(r1) ? 0 : r1, isNaN(r2) ? 0 : r2];
  return {
    width: innerWidth,
    move: transformedRange,
    dataLoaded: data.length > 0,
    childMappingProps: null,
    listener: {
      "brush.__internal__ end.__internal__": instance => () => {
        if (
          (currentEvent.sourceEvent &&
            currentEvent.sourceEvent.type === "zoom") ||
          !currentEvent.sourceEvent
        )
          return;
        let s = currentEvent.selection || [0, innerWidth];
        let t = zoomIdentity
          .scale(innerWidth / (s[1] - s[0]))
          .translate(-s[0], 0);
        let isEnd = currentEvent.type === "end";
        let isOridalScale =
          !transformedXScale.invert && transformedXScale.bandwidth;
        let transformedDomain = isOridalScale
          ? addInvertForScale(xScale.copy()).invertExtent.apply(
              null,
              xScale
                .copy()
                .range()
                .map(t.invertX, t)
            )
          : t.rescaleX(xScale.copy()).domain();
        __addedPropsToContext__({
          xScale: transformedXScale.copy().domain(transformedDomain)
        });
        if (isEnd && __zoomInstance__) {
          let { zoom, node } = __zoomInstance__;
          zoom.transform(select(node), t);
        }
      }
    },
    children: React.Children.map(children, child => {
      if (child && child.props && child.props.__brushStoringProps__) {
        return React.cloneElement(child, {
          ...child.props.__brushStoringProps__(
            brushContext,
            __brushProviderProps__,
            __chartProviderContext__
          ),
          channel: BRUSHCHANNEL //change brush children's chart channel to brush channel
        });
      } else return null;
    })
  };
};
const subscriberChannel = BRUSHCHANNEL; //set brush in brush channel
export default withSubscriber({ mapContextToProps, subscriberChannel })(Brush);
