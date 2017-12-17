import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PREFIX } from "../constant";
export default class Svg extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, children, ...rest } = this.props;
    return (
      <svg className={cx(`${PREFIX}-svg`, className)} {...rest}>
        {children}
      </svg>
    );
  }
}
Svg.displayName = `${PREFIX}-Svg`;
Svg.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};
Svg.defaultProps = {
  width: 800,
  height: 800
};
