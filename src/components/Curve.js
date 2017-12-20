import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PREFIX } from "../constant";
import { line } from "d3-shape";
import Group from "./Group";
export default class Curve extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
      xScale,
      yScale,
      x,
      y,
      defined,
      curve,
      symbolGenerator,
      ...rest
    } = this.props;
    let lineGenerator = line()
      .x(d => xScale(x(d)))
      .y(d => yScale(y(d)));
    defined && lineGenerator.defined(defined);
    curve && lineGenerator.curve(curve);
    return (
      <Group className={`${PREFIX}-curve-group`}>
        <path
          className={cx(`${PREFIX}-curve`, className)}
          d={lineGenerator(data)}
          {...rest}
        />
        {symbolGenerator && (
          <Group className={`${PREFIX}-curve-symbols-group`}>
            data.map(symbolGenerator)
          </Group>
        )}
      </Group>
    );
  }
}
Curve.displayName = `${PREFIX}-Curve`;
Curve.PropTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.func.isRequired, //accessor func
  y: PropTypes.func.isRequired,
  defined: PropTypes.func,
  curve: PropTypes.curve,
  symbolGenerator: PropTypes.func
};
Curve.defaultProps = {};
