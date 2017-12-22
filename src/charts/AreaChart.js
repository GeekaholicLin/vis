import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SVG from "../components/SVG";
import Group from "../components/Group";
import { Area, Axis } from "../components/index";
import { PREFIX, DEFAULT_PROPS } from "../constant";
export default class AreaChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      width,
      height,
      margin,
      data,
      x,
      x0,
      x1,
      y,
      y0,
      y1,
      xScale,
      yScale,
      xDomain,
      yDomain,
      xRange,
      yRange,
      defined,
      curve,
      xTickFormat,
      yTickFormat,
      tickPadding,
      ...rest
    } = this.props;
    let areaProps = Object.keys(Area.propTypes);
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
        className={cx(`${PREFIX}-area-chart`, className)}
        width={width}
        height={height}
      >
        <Group>
          <Area
            className="area-chart-area"
            data={data}
            x={x}
            x0={x0}
            x1={x1}
            y={y}
            y0={y0}
            y1={y1}
            defined={defined}
            curve={curve}
            xScale={xScale}
            yScale={yScale}
            fill={"steelblue"}
            stroke={"none"}
          />
          <Axis
            key={"x"}
            className={"vis-app-xAxis"}
            scale={xScale}
            tickFormat={xTickFormat}
            tickPadding={tickPadding}
            transform={`translate(0,${innerHeight + margin.top})`}
          />
          <Axis
            key={"y"}
            orientation={"left"}
            className={"vis-app-yAxis"}
            scale={yScale}
            tickFormat={yTickFormat}
            tickPadding={tickPadding}
            transform={`translate(${margin.left},0)`}
          />
        </Group>
      </SVG>
    );
  }
}

AreaChart.displayName = `${PREFIX}-AreaChart`;
AreaChart.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  ...Area.propTypes
};
AreaChart.defaultProps = {
  ...DEFAULT_PROPS
};