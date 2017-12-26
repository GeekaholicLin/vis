import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Axis from "./Axis";
import { PREFIX } from "../constant";

export default class YAxis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className } = this.props;
    return (
      <Axis {...this.props} className={cx(`${PREFIX}-yAxis`, className)} />
    );
  }
}
YAxis.displayName = `${PREFIX}YAxis`;
YAxis.propTypes = {
  ...Axis.propTypes,
  orientation: PropTypes.oneOf(["left", "right"])
};
YAxis.defaultProps = {
  ...Axis.defaultProps,
  orientation: "left"
};
