import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PREFIX } from "../constant";

export default class Rect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, top, left, ...rest } = this.props;
    return (
      <rect
        className={cx(`${PREFIX}-rect`, className)}
        x={left}
        y={top}
        {...rest}
      />
    );
  }
}
Rect.displayName = `${PREFIX}-Rect`;
Rect.propTypes = {
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rx: PropTypes.number,
  ry: PropTypes.number
};
Rect.defaultProps = {};
