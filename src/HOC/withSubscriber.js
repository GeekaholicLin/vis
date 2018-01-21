import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import { CHANNEL } from "constant";
import { getDisplayName, mappingPropsWithKeys } from "ultis";

export default (
  {
    mapContextToProps = () => ({}), //default empty object
    hoistPropsToContext = () => ({}),
    skipPropsKeys = [],
    shouldRenderOutside = false,
    channel = CHANNEL
  } = {}
) => BasicComponent => {
  class WithSubscriber extends Component {
    render() {
      //Skip render flag, hoist function and [skipPropsKeys]
      //And pass hoist function directly to Provider
      return (
        <Subscriber channel={channel}>
          {context => {
            return (
              <BasicComponent
                {...mapContextToProps(context, this)}
                {...mappingPropsWithKeys(this.props, Object.keys(this.props), [
                  "__outside__",
                  "__hoistingProps__",
                  ...(_.isArray(skipPropsKeys)
                    ? skipPropsKeys
                    : [skipPropsKeys])
                ])}
              />
            );
          }}
        </Subscriber>
      );
    }
  }
  WithSubscriber.displayName = `WithSubscriber(${getDisplayName(
    BasicComponent
  )})`;
  WithSubscriber.defaultProps = {
    __outside__: shouldRenderOutside,
    __hoistingProps__: hoistPropsToContext
  };
  return WithSubscriber;
};
