import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { symbol } from "d3-shape";
import _ from "lodash";
import Group from "./Group";
import { PREFIX, SYMBOLS_MAP } from "../constant";

export default class D3Symbol extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, children, top, left, type, size, ...rest } = this.props;
    let symbolGenerator = symbol
      .type(_.isFunction(type) ? type : SYMBOLS_MAP[type])
      .size(size);
    return (
      <Group className={`${PREFIX}-symbol-group`} left={left} top={top}>
        <path
          className={cx(`${PREFIX}-symbol`, className)}
          d={symbolGenerator()}
        />
        {children}
      </Group>
    );
  }
}

D3Symbol.displayName = `${PREFIX}-D3Symbol`;
D3Symbol.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node, //for label etc.
  left: PropTypes.number,
  top: PropTypes.number,
  type: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(SYMBOLS_MAP)),
    PropTypes.shape({ draw: PropTypes.func.isRequired }) //a draw func obj for custom symbols
  ]),
  size: PropTypes.number
};
D3Symbol.defaultProps = {
  type: "circle",
  size: 64,
  left: 0,
  top: 0
};
