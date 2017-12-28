import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import D3Axis from "./D3Axis";
import { PREFIX } from "../constant";

export default class D3XAxis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className } = this.props;
    return (
      <D3Axis {...this.props} className={cx(`${PREFIX}-d3-xAxis`, className)} />
    );
  }
}
D3XAxis.displayName = `${PREFIX}D3XAxis`;
D3XAxis.propTypes = {
  ...D3Axis.propTypes,
  orientation: PropTypes.oneOf(["top", "bottom"])
};
D3XAxis.defaultProps = {
  ...D3Axis.defaultProps,
  orientation: "bottom"
};
