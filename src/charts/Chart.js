import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { extent, max } from "d3-array";
import { Group, SVG } from "../components/index";
import { PREFIX, ORIENTATION, SCALES, DEFAULT_PROPS } from "../constant";

export default class Chart extends Component {
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
      data,
      x,
      y,
      xScale,
      yScale,
      xDomain,
      yDomain,
      xRange,
      yRange,
      grid
    } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    xScale.domain(xDomain || extent(data, x)).range(xRange || [0, innerWidth]);
    yScale
      .domain(yDomain || [0, max(data, y)])
      .range(yRange || [innerHeight, 0]);
    let mappingProps = {
      XAxis: {
        scale: xScale,
        tickSizeInner: ["column", "auto"].indexOf(grid) > -1 ? -innerHeight : 6,
        top: innerHeight
      },
      YAxis: {
        scale: yScale,
        tickSizeInner: ["row", "auto"].indexOf(grid) > -1 ? -innerWidth : 6
      },
      Curve: {
        data,
        xScale,
        yScale,
        x,
        y
      }
    };
    return (
      <SVG
        className={cx(`${PREFIX}-chart`, className)}
        width={width}
        height={height}
      >
        <Group left={margin.left} top={margin.top}>
          {React.Children.map(children, el => {
            return React.cloneElement(el, {
              ...mappingProps[el.type.name]
            });
          })}
        </Group>
      </SVG>
    );
  }
}
Chart.displayName = `${PREFIX}Chart`;
Chart.propTypes = {
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
  data: PropTypes.array, //the following prop with map to all of children
  x: PropTypes.func.isRequired, //accessor func
  y: PropTypes.func.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xRange: PropTypes.array,
  yRange: PropTypes.array,
  grid: PropTypes.oneOf(["row", "column", "none", "auto"])
};
Chart.defaultProps = {
  ...DEFAULT_PROPS,
  grid: "none"
};
