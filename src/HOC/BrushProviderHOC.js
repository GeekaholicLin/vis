import React from "react";
import BrushProvider from "./BrushProvider";
import withSubscriber from "./withSubscriber";

// use __originalProps__ and selftProps merged object as brushContext
// use BrushProviderHOC selftProps as brushProps
// important:
// brushProps and brushContext are pass from BrushProviderHOC to Brush

const mapContextToProps = ({ __originalProps__ }, selfProps) => {
  return {
    brushProps: selfProps,
    ...__originalProps__,
    ...selfProps
  };
};
const componentRenderSide = "outer";
export default withSubscriber({
  mapContextToProps,
  componentRenderSide
})(BrushProvider);
