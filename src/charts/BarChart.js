import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SVG from "../components/SVG";
import Group from "../components/Group";
import { Bar, Axis } from "../components/index";
import { PREFIX, DEFAULT_PROPS } from "../constant";
export default class BarChart extends Component {
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
      y,
      xScale,
      yScale,
      xDomain,
      yDomain,
      xRange,
      yRange,
      xTickFormat,
      yTickFormat,
      tickPadding,
      top,
      left,
      ...rest
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
        className={cx(`${PREFIX}-bar-chart`, className)}
        width={width}
        height={height}
      >
        <Group>
          <Bar
            data={data}
            left={d => xScale(x(d))}
            top={d => yScale(y(d))}
            width={xScale.bandwidth()}
            height={d => innerHeight + margin.bottom - yScale(d.frequency)}
            color={"steelblue"}
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
            ticks={[10, "%"]}
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

BarChart.displayName = `${PREFIX}-BarChart`;
BarChart.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  ...Bar.propTypes
};
BarChart.defaultProps = {
  ...DEFAULT_PROPS
};
