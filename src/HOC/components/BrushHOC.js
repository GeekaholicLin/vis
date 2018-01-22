import React from "react";
import { Brush } from "components";
import withSubscriber from "../withSubscriber";
import { BRUSHCHANNEL } from "constant";

const mapContextToProps = ({ brushProps, ...brushContext }) => {
  let { children, xScale, width, margin } = brushContext;
  let innerWidth = width - margin.left - margin.right;
  // console.log("brushContext,brushProps", brushContext, brushProps);
  return {
    width: innerWidth,
    childMappingProps: null,
    children: React.Children.map(children, child => {
      if (child && child.props && child.props.__brushStoringProps__) {
        return React.cloneElement(child, {
          ...child.props.__brushStoringProps__(brushContext, brushProps),
          channel: BRUSHCHANNEL //change brush children's chart channel to brush channel
        });
      } else return null;
    })
  };
};
const subscriberChannel = BRUSHCHANNEL; //set brush in brush channel
export default withSubscriber({ mapContextToProps, subscriberChannel })(Brush);
