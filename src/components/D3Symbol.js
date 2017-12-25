import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { symbol } from "d3-shape";
import _ from "lodash";
import Group from "./Group";
import { PREFIX, SYMBOLS_MAP, ALL_COMMON_PROPTYPES } from "../constant";

export default class D3Symbol extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, left, top, type, size, ...rest } = this.props;
    let symbolGenerator = symbol
      .type(_.isFunction(type) ? type : SYMBOLS_MAP[type])
      .size(size);
    return (
      <path
        className={cx(`${PREFIX}-symbol`, className)}
        d={symbolGenerator()}
        transform={`translate(${left},${top})`}
        {...rest}
      />
    );
  }
}

D3Symbol.displayName = `${PREFIX}D3Symbol`;
D3Symbol.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(SYMBOLS_MAP)),
    PropTypes.shape({ draw: PropTypes.func }) //a draw func obj for custom symbols
  ]),
  size: PropTypes.number,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
D3Symbol.defaultProps = {
  type: "circle",
  size: 64,
  left: 0,
  top: 0
};
