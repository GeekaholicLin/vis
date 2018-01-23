import React from "react";
import BrushProvider from "./BrushProvider";
import withSubscriber from "./withSubscriber";

// use __originalProps__ and __brushProviderProps__ merged object as brushContext
// see usage in BrushHOC.js

const mapContextToProps = (
  __chartProviderContext__,
  __brushProviderProps__
) => {
  let { __originalProps__ } = __chartProviderContext__;
  return {
    __brushProviderProps__,
    __chartProviderContext__,
    ...__originalProps__,
    ...__brushProviderProps__
  };
};
const componentRenderSide = "outer";
export default withSubscriber({
  mapContextToProps,
  componentRenderSide
})(BrushProvider);
