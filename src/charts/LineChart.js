import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SVG from "../components/SVG";
import Group from "../components/Group";
import { Curve, Axis } from "../components/index";
import { PREFIX, ORIENTATION, SCALES, DEFAULT_PROPS } from "../constant";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      className,
      children,
      width,
      height,
      margin,
      defined,
      curve,
      data,
      x,
      y,
      xScale,
      yScale,
      xTickFormat,
      yTickFormat,
      xDomain,
      yDomain,
      xRange,
      yRange,
      tickPadding
    } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    let xNewScale = xScale
      .domain(xDomain || [0, max(data, x)])
      .range(xRange || [margin.left, width - margin.right]);
    let yNewScale = yScale
      .domain(yDomain || [0, max(data, y)])
      .range(yRange || [height - margin.top, margin.bottom]);
    return (
      <SVG
        className={cx(`${PREFIX}-line-chart`, className)}
        width={width}
        height={height}
      >
        <Group>
          <Curve
            className={"vis-app-curve"}
            data={data}
            x={x}
            y={y}
            xScale={xScale}
            yScale={yScale}
            defined={defined}
            curve={curve}
          />
          <Axis
            key={"x"}
            className={"line-chart-xAxis"}
            scale={xScale}
            tickFormat={xTickFormat}
            tickPadding={tickPadding}
            tickSizeInner={-innerHeight}
            transform={`translate(0,${innerHeight + margin.top})`}
          />
          <Axis
            key={"y"}
            orientation={"left"}
            className={"line-chart-yAxis"}
            scale={yScale}
            tickFormat={yTickFormat}
            tickPadding={tickPadding}
            tickSizeInner={-innerWidth}
            transform={`translate(${margin.left},0)`}
          />
        </Group>
      </SVG>
    );
  }
}
LineChart.displayName = `${PREFIX}-LineChart`;
LineChart.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  defined: PropTypes.func,
  curve: PropTypes.func,
  data: PropTypes.array, //the following prop with map to all of children
  x: PropTypes.func.isRequired, //accessor func
  y: PropTypes.func.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xRange: PropTypes.array,
  yRange: PropTypes.array,
  xTickFormat: PropTypes.func,
  yTickFormat: PropTypes.func
};
LineChart.defaultProps = {
  ...DEFAULT_PROPS
};
