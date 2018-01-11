import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Group from "./Group";
import Line from "./Line";
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
            xScale.domain().map((category, i) => {
              //inspired by d3 bandScale rescale source code
              //https://github.com/d3/d3-scale/blob/master/src/band.js#L18
              let n = xScale.domain().length;
              let range = xScale.range();
              let round = xScale.round();
              let paddingInner = xScale.paddingInner();
              let align = xScale.align();
              let reverse = range[1] < range[0],
                start = range[reverse - 0],
                stop = range[1 - reverse],
                step = xScale.step(),
                bandwidth = xScale.bandwidth();
              start += (stop - start - step * (n - paddingInner)) * align;
              if (round) start = Math.round(start);
              let x = start + +step * i + bandwidth / 2;
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
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Grid.defaultProps = {
  ...Line.defaultProps,
  stroke: "#ccc",
  strokeWidth: 2,
  fill: "none"
};
