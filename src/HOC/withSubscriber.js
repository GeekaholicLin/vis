import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import { CHANNEL } from "constant";
import { getDisplayName } from "ultis";
export default (
  mapStateToProps,
  shouldRenderOutside = false,
  channel = CHANNEL
) => BasicComponent => {
  class WithSubscriber extends Component {
    render() {
      let { __outside__, ...restProps } = this.props; //skip render flag
      return (
        <Subscriber channel={channel}>
          {context => {
            return (
              <BasicComponent
                {...mapStateToProps(context, this)}
                {...restProps}
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
    __outside__: shouldRenderOutside
  };
  return WithSubscriber;
};
