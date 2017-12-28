import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import D3Axis from "./D3Axis";
import { PREFIX } from "../constant";

export default class D3YAxis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className } = this.props;
    return (
      <D3Axis {...this.props} className={cx(`${PREFIX}-d3-yAxis`, className)} />
    );
  }
}
D3YAxis.displayName = `${PREFIX}D3YAxis`;
D3YAxis.propTypes = {
  ...D3Axis.propTypes,
  orientation: PropTypes.oneOf(["left", "right"])
};
D3YAxis.defaultProps = {
  ...D3Axis.defaultProps,
  orientation: "left"
};
