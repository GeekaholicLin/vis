import React, { Component } from "react";
import { Brush } from "components";
import { Broadcast } from "react-broadcast";
import BrushHOC from "./components/BrushHOC";
import { BRUSHCHANNEL, PREFIX } from "constant";

export default class BrushProvider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { compareValues, ...contextAndProps } = this.props;
    return (
      <Broadcast
        channel={BRUSHCHANNEL}
        value={contextAndProps}
        compareValues={compareValues}
      >
        <BrushHOC />
      </Broadcast>
    );
  }
}
BrushProvider.displayName = `${PREFIX}BrushProvider`;
BrushProvider.defaultProps = {
  ...Brush.defaultProps
};
