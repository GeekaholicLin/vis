import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Group from "./Group";
import Line from "./Line";
import { getOrinalRange } from "../ultis";
import { PREFIX, ALL_COMMON_PROPTYPES } from "../constant";
export default class Grid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      left,
      top,
      xScale,
      yScale,
      width,
      height,
      grid,
      ...rest
    } = this.props;
    return (
      <Group left={left} top={top} className={className}>
        <Group className={`${PREFIX}-grid-rows`}>
          {yScale.ticks &&
            yScale.ticks().map((d, i) => {
              let y = yScale(d) + 0.5;
              return (
                <Line
                  key={`${PREFIX}-grid-row-${i}`}
                  className={`${PREFIX}-grid-row`}
                  from={{ x: 0, y }}
                  to={{ x: width, y }}
                  {...rest}
                />
              );
            })}
        </Group>
        <Group className={`${PREFIX}-grid-cols`}>
          {xScale.ticks &&
            xScale.ticks().map((d, i) => {
              let x = xScale(d) + 0.5;
              return (
                <Line
                  key={`${PREFIX}-grid-col-${i}`}
                  className={`${PREFIX}-grid-col`}
                  from={{ x, y: 0 }}
                  to={{ x, y: height }}
                  {...rest}
                />
              );
            })}
          {!xScale.ticks &&
            xScale.step &&
            getOrinalRange(xScale).map((value, i) => {
              let x = value + xScale.bandwidth() / 2;
              return (
                <Line
                  key={`${PREFIX}-grid-col-${i}`}
                  className={`${PREFIX}-grid-col`}
                  from={{ x, y: 0 }}
                  to={{ x, y: height }}
                  {...rest}
                />
              );
            })}
        </Group>
      </Group>
    );
  }
}
Grid.displayName = `${PREFIX}Grid`;
Grid.propTypes = {
  className: PropTypes.string,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number
  ]),
  grid: PropTypes.oneOf(["row", "column", "auto"]),
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Grid.defaultProps = {
  ...Line.defaultProps,
  stroke: "#ccc",
  strokeWidth: 2,
  fill: "none",
  grid: "auto"
};
