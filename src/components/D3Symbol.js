import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { symbol } from "d3-shape";
import _ from "lodash";
import SVG from "./Svg";
import {
  PREFIX,
  SYMBOLS_MAP,
  ALL_COMMON_PROPTYPES,
  ALL_DEFAULT_PROPS
} from "../constant";

export default class D3Symbol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 64
    };
    this.node = null;
  }
  componentDidMount() {
    let { width, height } = this.props;
    let box = this.node.getBBox();
    let error = Math.min(width / box.width, height / box.height);
    this.setState({
      size: error * error * 64
    });
  }
  getInnerRef = node => {
    this.node = node;
  };
  render() {
    let { className, type, left, top, width, height, ...rest } = this.props;
    let { size } = this.state;
    let symbolGenerator = symbol()
      .type(_.isFunction(type) ? type : SYMBOLS_MAP[type])
      .size(size);
    return (
      <SVG
        className={cx(`${PREFIX}-symbol`, className)}
        width={width}
        height={height}
        left={left}
        top={top}
      >
        <path
          d={symbolGenerator()}
          transform={`translate(${width / 2},${height / 2})`}
          ref={this.getInnerRef}
          {...rest}
        />
      </SVG>
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
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
D3Symbol.defaultProps = {
  type: "circle",
  width: 16,
  height: 16
};
