import React, { Component } from "react";
import { Subscriber } from "react-broadcast";
import { CHANNEL } from "constant";
import { getDisplayName } from "ultis";
export default (
  mapContextToProps = () => ({}), //default empty object
  shouldRenderOutside = false,
  channel = CHANNEL
) => BasicComponent => {
  class WithSubscriber extends Component {
    constructor(props) {
      super(props);
      this.context = null;
    }
    render() {
      let { __outside__, ...restProps } = this.props; //skip render flag
      return (
        <Subscriber channel={channel}>
          {context => {
            this.context = context;
            return (
              <BasicComponent
                {...mapContextToProps(context, this)}
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
