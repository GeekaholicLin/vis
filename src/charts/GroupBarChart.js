import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SVG from "../components/SVG";
import Group from "../components/Group";
import { Bar, Axis, Stack } from "../components/index";
import { PREFIX, DEFAULT_PROPS } from "../constant";
export default class GroupBarChart extends Component {
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
      x0,
      x1,
      y,
      x0Scale,
      x1Scale,
      yScale,
      x0Domain,
      x1Domain,
      yDomain,
      x0Range,
      x1Range,
      yRange,
      xTickFormat,
      yTickFormat,
      tickPadding,
      top,
      left,
      color,
      ...rest
    } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    x0Scale
      .domain(x0Domain || [0, max(data, x0)])
      .range(x0Range || [margin.left, width - margin.right]);
    x1Scale
      .domain(x1Domain || [0, max(data, x1)])
      .range(x1Range || [0, x0Scale.bandwidth()]);

    yScale
      .domain(yDomain || [0, max(data, y)])
      .range(yRange || [height - margin.top, margin.bottom]);
    let keys = _.isFunction(x1Domain) ? x1Domain() : x1Domain;
    return (
      <SVG
        className={cx(`${PREFIX}-bar-chart`, className)}
        width={width}
        height={height}
      >
        <Group>
          {data.map((barGroupArr, i) => {
            return (
              <Group
                className={`grouped-bar-category-${i}`}
                left={x0Scale(x0(barGroupArr))}
                top={0}
                key={`grouped-bar-category-${i}`}
              >
                <Bar
                  data={keys.map(key => ({
                    key: key,
                    value: barGroupArr[key]
                  }))}
                  left={d => x1Scale(x1(d))}
                  top={d => yScale(y(d))}
                  width={x1Scale.bandwidth()}
                  height={d => height - margin.top - yScale(y(d))}
                  fill={d => color(x1(d))}
                  stroke={"none"}
                />
              </Group>
            );
          })}

          <Axis
            key={"x"}
            className={"vis-app-xAxis"}
            scale={x0Scale}
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

GroupBarChart.displayName = `${PREFIX}-BarChart`;
GroupBarChart.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};
GroupBarChart.defaultProps = {
  ...DEFAULT_PROPS
};
