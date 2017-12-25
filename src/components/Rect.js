import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PREFIX } from "../constant";

export default class Rect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
      top,
      left,
      width,
      height,
      rx,
      ry,
      ...rest
    } = this.props;
    return (
      <rect
        className={cx(`${PREFIX}-rect`, className)}
        x={_.isFunction(left) ? left(data) : left}
        y={_.isFunction(top) ? top(data) : top}
        width={_.isFunction(width) ? width(data) : width}
        height={_.isFunction(height) ? height(data) : height}
        rx={_.isFunction(rx) ? rx(data) : rx}
        ry={_.isFunction(ry) ? ry(data) : ry}
        {...rest}
      />
    );
  }
}
Rect.displayName = `${PREFIX}Rect`;
Rect.propTypes = {
  className: PropTypes.string,
  top: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.string
  ]),
  left: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.string
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.string
  ]),
  rx: PropTypes.oneOfType([PropTypes.number, PropTypes.func, PropTypes.string]),
  ry: PropTypes.oneOfType([PropTypes.number, PropTypes.func, PropTypes.string])
};
Rect.defaultProps = {
  left: 0,
  top: 0
};
