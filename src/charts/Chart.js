import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { extent, max } from "d3-array";
import { select } from "d3-selection";
import { zoom as zoomBehaviorGenerator, zoomTransform } from "d3-zoom";
import { Group, SVG, Text, Rect, ClipPath } from "../components/index";
import { PREFIX, ORIENTATION, SCALES, DEFAULT_PROPS } from "../constant";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: this.getZoomBehavior(props.zoom),
      transform: null
    };
    this.node = null;
  }
  componentDidMount() {
    let { zoom, transform } = this.state;
    zoom && zoom(select(this.node)); //zoom may be null
    zoom &&
      this.setState({
        transform: zoomTransform(this.node) //get init transform
      });
  }

  getZoomBehavior(zoom) {
    if (_.isFunction(zoom)) return zoom;
    if (zoom) {
      return zoomBehaviorGenerator()
        .scaleExtent([1, 2])
        .translateExtent([[0, 0], [innerWidth, innerHeight]])
        .extent([[0, 0], [innerWidth, innerHeight]])
        .on("zoom", this.zoomed.bind(this));
    }
    return null;
  }
  zoomed() {
    let { zoom } = this.state;
    zoom &&
      this.setState({
        transform: zoomTransform(this.node) //update transform state
      });
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
      title,
      zoom,
      clip,
      x1 = d => d.key, //special prop for group bar chart
      x1Domain,
      x1Scale
    } = this.props;
    let { transform } = this.state;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    xScale
      .domain(xDomain || extent(data, x))
      .range(xRange || [0, width - margin.left - margin.right]);
    let transformedXScale = xScale.copy();
    transform &&
      transformedXScale.domain(
        transform.rescaleX(transformedXScale).domain()
      ) &&
      console.log("transform", transform.toString());
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
        scale: transformedXScale,
        top: innerHeight
      },
      YAxis: {
        scale: yScale
      },
      Grid: {
        xScale: transformedXScale,
        yScale,
        width: ["auto", "row"].indexOf(grid) > -1 ? innerWidth : 0,
        height: ["auto", "column"].indexOf(grid) > -1 ? innerHeight : 0
      },
      Curve: {
        xScale: transformedXScale,
        yScale,
        clipPath: "url(#chart-clip-path)"
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
      },
      Marker: {
        xScale: transformedXScale,
        yScale,
        width,
        height,
        innerHeight,
        innerWidth
      }
    };

    let titleEle = _.isString(title) ? (
      <Text
        fontSize={20}
        verticalAnchor="start"
        top={10}
        left={innerWidth / 2 + margin.left}
        textAnchor="middle"
      >
        {title}
      </Text>
    ) : (
      title
    );
    return (
      <SVG
        className={cx(`${PREFIX}-chart`, className)}
        width={width}
        height={height}
      >
        {zoom || clip ? (
          <ClipPath id="chart-clip-path">
            <Rect width={innerWidth} height={innerHeight} fill={"none"} />
          </ClipPath>
        ) : null}
        {titleEle}
        {zoom ? (
          <Rect
            className="chart-zoom-area"
            width={innerWidth}
            height={innerHeight}
            left={margin.left}
            top={margin.top}
            fill={"none"}
            getInnerRef={node => (this.node = node)}
            style={{ pointerEvents: "all", cursor: "move" }}
          />
        ) : null}
        <Group left={margin.left} top={margin.top}>
          {React.Children.map(children, el => {
            //skip null
            if (el) {
              return React.cloneElement(el, {
                className: className
                  ? _.kebabCase(className + el.type.name)
                  : "", //inject className automatically
                ...mappingProps[el.type.name]
              });
            }
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
  grid: PropTypes.oneOf(["row", "column", "none", "auto"]),
  title: PropTypes.node,
  zoom: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  clip: PropTypes.bool
};
Chart.defaultProps = {
  ...DEFAULT_PROPS,
  grid: "none",
  zoom: false,
  clip: true
};
