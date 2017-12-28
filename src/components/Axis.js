/**
 * inspired by d3-axis source code
 * https://github.com/d3/d3-axis/blob/master/src/axis.js
 */
import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import cx from "classnames";
import {
  PREFIX,
  ORIENTATION_MAP,
  SCALES,
  ALL_COMMON_PROPTYPES,
  ALL_DEFAULT_PROPS
} from "../constant";
import Group from "./Group";
export default class Axis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      left,
      top,
      orientation,
      scale,
      ticks, //tickArguments
      tickValues,
      tickFormat,
      tickSize,
      tickSizeInner,
      tickSizeOuter,
      tickPadding,
      ...rest
    } = this.props;
    var translateX = x => "translate(" + (x + 0.5) + ",0)",
      translateY = y => "translate(0," + (y + 0.5) + ")",
      number = scale => d => +scale(d),
      identity = x => x,
      center = scale => {
        let offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
        if (scale.round()) offset = Math.round(offset);
        return function(d) {
          return +scale(d) + offset;
        };
      }, //all of the above are helper func
      k = ["top", "left"].indexOf(orientation) > -1 ? -1 : 1,
      x = ["left", "right"].indexOf(orientation) > -1 ? "x" : "y",
      transform =
        ["top", "bottom"].indexOf(orientation) > -1 ? translateX : translateY,
      values =
        tickValues == null
          ? scale.ticks ? scale.ticks.apply(scale, ticks) : scale.domain()
          : tickValues,
      format =
        tickFormat == null
          ? scale.tickFormat ? scale.tickFormat.apply(scale, ticks) : identity
          : tickFormat,
      spacing = Math.max(tickSizeInner, 0) + tickPadding,
      range = scale.range(),
      range0 = +range[0] + 0.5,
      range1 = +range[range.length - 1] + 0.5,
      position = (scale.bandwidth ? center : number)(scale.copy());
    let dynamicProps = {
      x: { x: k * spacing },
      y: { y: k * spacing },
      x2: { x2: k * tickSizeInner },
      y2: { y2: k * tickSizeInner }
    }; //depend on [x]'s value
    return (
      <Group
        className={cx(`${PREFIX}-axis`, className)}
        top={top}
        left={left}
        fill={"none"}
        fontSize={10}
        fontFamily="sans-seriif"
        textAnchor={
          orientation === "right"
            ? "start"
            : orientation === "left" ? "end" : "middle"
        }
      >
        <path
          className={`${PREFIX}-axis-domain`}
          stroke="#000"
          strokeWidth={1}
          d={
            ["left", "right"].indexOf(orientation) > -1
              ? `M${k * tickSizeOuter},${range0}H0.5V${range1}H${k *
                  tickSizeOuter}`
              : `M${range0},${k * tickSizeOuter}V0.5H${range1}V${k *
                  tickSizeOuter}`
          }
        />
        {/* generate ticks */}
        {values.map((val, index) => {
          return (
            <Group
              key={`${PREFIX}-axis-tick-${val}-${index}`}
              className={`${PREFIX}-axis-tick`}
              opacity={1}
              transform={transform(position(val))}
            >
              <line
                className={`${PREFIX}-axis-tick-line`}
                stroke="#000"
                {...dynamicProps[x + "2"]}
              />
              <text
                className={`${PREFIX}-axis-tick-text`}
                fill="#000"
                {...dynamicProps[x]}
                dy={
                  orientation === "top"
                    ? "0em"
                    : orientation === "bottom" ? "0.71em" : "0.32em"
                }
              >
                {format(val, index)}
              </text>
            </Group>
          );
        })}
      </Group>
    );
  }
}
Axis.displayName = `${PREFIX}CustomAxis`;
Axis.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(Object.keys(ORIENTATION_MAP)),
  scale: PropTypes.func,
  ticks: PropTypes.array,
  tickValues: PropTypes.array,
  tickFormat: PropTypes.func,
  tickSize: PropTypes.number,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Axis.defaultProps = {
  orientation: "bottom",
  ticks: [],
  tickValues: null,
  tickFormat: null,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
