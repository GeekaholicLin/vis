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
      grid,
      x1 = d => d.key, //special prop for group bar chart
      x1Domain,
      x1Scale
    } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    xScale.domain(xDomain || extent(data, x)).range(xRange || [0, innerWidth]);
    yScale
      .domain(yDomain || [0, max(data, y)])
      .range(yRange || [innerHeight, 0]);
    /* special prop for group bar chart */
    x1Domain && x1Scale
      ? x1Scale
          .domain(x1Domain)
          .rangeRound([0, xScale ? xScale.bandwidth() : 1])
      : null;
    /**
     * override current props or adding props to the certain component
     * it seems like default props for component mapping down from Chart props
     */
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
        xScale,
        yScale
      },
      Area: {
        xScale,
        yScale
      },
      Bar: {
        left: d => xScale(x(d)),
        top: d => yScale(y(d)),
        width: xScale.bandwidth ? xScale.bandwidth() : 0, //fix xScale.bandwidth() is not a function bug
        height: d => innerHeight - yScale(y(d))
      },
      Stack: {
        childMappingProps: {
          Area: {
            xScale,
            yScale
          },
          Bar: {
            left: d => xScale(x(d)),
            top: d => yScale(y(d)),
            width: xScale.bandwidth ? xScale.bandwidth() : 1, //fix xScale.bandwidth() is not a function bug
            height: d => yScale(d[0]) - yScale(d[1])
          }
        }
      },
      Group: {
        left: d => xScale(x(d)),
        childMappingProps: {
          Bar: {
            top: d => yScale(y(d)),
            left: d => (x1Scale && x1 ? x1Scale(x1(d)) : 0),
            width: x1Scale && x1Scale.bandwidth ? x1Scale.bandwidth() : 1,
            height: d => innerHeight - yScale(y(d))
          }
        }
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
              className: className ? _.kebabCase(className + el.type.name) : "", //inject className automatically
              ...mappingProps[el.type.name]
            });
          })}
        </Group>
      </SVG>
    );
  }
}
Chart.displayName = `${PREFIX}Chart`;
//Chart propTypes should not have `x1`
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
  x: PropTypes.func, //accessor func
  y: PropTypes.func,
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
