import React, { Component } from "react";
import PropTypes from "prop-types";
import { Subscriber } from "react-broadcast";
import { CHARTCHANNEL } from "constant";
import { getDisplayName, mappingPropsWithKeys } from "ultis";

export default (
  {
    mapContextToProps = () => ({}), //default empty object, context and subscriber as args
    hoistPropsToContext = () => ({}),
    skipPropsKeys = [],
    shouldRenderOutside = false,
    componentRenderSide = "inner",
    mapPropsToBrush = false,
    subscriberChannel
  } = {}
) => BasicComponent => {
  class WithSubscriber extends Component {
    render() {
      let { channel, quiet } = this.props;
      return (
        <Subscriber channel={subscriberChannel || channel} quiet={quiet}>
          {context => {
            return (
              <BasicComponent
                {...mapContextToProps(
                  context,
                  Object.assign(
                    {},
                    BasicComponent.defaultProps || {},
                    this.props
                  )
                )}
                {...mappingPropsWithKeys(this.props, Object.keys(this.props), [
                  ...Object.keys(WithSubscriber.defaultProps),
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
  // store the args as one Subscriber Component's built-in properties
  // maybe just like states to tell the differences between all the Subscriber Components
  // and these properties are used by BrushHOC or Provider to get or generate something helpful
  WithSubscriber.defaultProps = {
    __notSvg__: shouldRenderOutside, // flag if this is not-svg element (for provider)
    __hoistingProps__: hoistPropsToContext, // hoist props (for provider)
    __clip__: componentRenderSide, // flag render clip inner or outer (for provider to check)
    __brushStoringProps__: mapPropsToBrush, //the function to map props to brush children
    channel: CHARTCHANNEL,
    quiet: false
  };
  WithSubscriber.propTypes = {
    __notSvg__: PropTypes.bool,
    __hoistingProps__: PropTypes.func, //two agrs(Subscriber self props and Provider newest props)
    __clip__: PropTypes.oneOf(["inner", "outer"]),
    // two agrs(Provider's __originalProps__ merged with brush's props, brush's props)
    //please see in BrushProviderHOC.js file
    __brushStoringProps__: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  };
  return WithSubscriber;
};
