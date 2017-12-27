import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Axis from "./Axis";
import { PREFIX } from "../constant";

export default class XAxis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className } = this.props;
    return (
      <Axis {...this.props} className={cx(`${PREFIX}-xAxis`, className)} />
    );
  }
}
XAxis.displayName = `${PREFIX}XAxis`;
XAxis.propTypes = {
  ...Axis.propTypes,
  orientation: PropTypes.oneOf(["top", "bottom"])
};
XAxis.defaultProps = {
  ...Axis.defaultProps,
  orientation: "bottom"
};
