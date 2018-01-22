import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { Brush } from "components";
import { Broadcast, Subscriber } from "react-broadcast";
import BrushHOC from "./components/BrushHOC";
import { BRUSHCHANNEL, PREFIX } from "constant";

export default class BrushProvider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { compareValues, ...contextAndProps } = this.props;
    return (
      <Broadcast channel={BRUSHCHANNEL} value={contextAndProps}>
        <BrushHOC />
      </Broadcast>
    );
  }
}
BrushProvider.displayName = `${PREFIX}BrushProvider`;
BrushProvider.defaultProps = {
  ...Brush.defaultProps
};
