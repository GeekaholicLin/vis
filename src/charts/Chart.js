import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { extent, max } from "d3-array";
import { select, event as currentEvent } from "d3-selection";
import {
  zoom as zoomBehaviorGenerator,
  zoomTransform,
  zoomIdentity
} from "d3-zoom";
import { Group, SVG, Text, Rect, ClipPath } from "../components/index";
import { addInvertForScale } from "../ultis";
import { PREFIX, ORIENTATION, SCALES, DEFAULT_PROPS } from "../constant";
const OUTERCONTENTNAMES = ["XAxis", "YAxis", "Brush"];

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: this.getZoomBehavior(props.zoom),
      transform: null
    };
    this.node = null;
    this.innerWidth = props.width - props.margin.left - props.margin.right;
    this.chartId = this.props.id || _.uniqueId("__chart__");
  }
  componentDidMount() {
    let { zoom, transform } = this.state;
    zoom && zoom(select(this.node)); //zoom may be null
    zoom &&
      this.setState({
        transform: zoomTransform(this.node) //get init transform
      });
  }
  removePrefix(displayName, prefix = `${PREFIX}`) {
    return displayName ? displayName.slice(prefix.length) : "";
  }
  getZoomBehavior(zoom) {
    let { width, height, margin } = this.props;
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;
    if (_.isFunction(zoom)) return zoom;
    if (zoom) {
      return zoomBehaviorGenerator()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [innerWidth, innerHeight]])
        .extent([[0, 0], [innerWidth, innerHeight]])
        .on("zoom", this.zoomed.bind(this));
    }
    return null;
  }
  zoomed() {
    let { zoom } = this.state;
    if (currentEvent.sourceEvent && currentEvent.sourceEvent.type === "brush")
      return;
    zoom &&
      this.setState({
        transform: zoomTransform(this.node) //update transform state
      });
  }
  brushed = (d, i, node) => {
    let { transform, zoom } = this.state;
    //!currentEvent.sourceEvent is to skip init render side-effect
    if (
      (currentEvent.sourceEvent && currentEvent.sourceEvent.type === "zoom") ||
      !currentEvent.sourceEvent
    )
      return;
    let s = currentEvent.selection || [0, this.innerWidth];
    let t = zoomIdentity
      .scale(this.innerWidth / (s[1] - s[0]))
      .translate(-s[0], 0);

    //to judge transform and t is important.Or it will cause circular render
    if (
      zoom &&
      transform &&
      (transform.k !== t.k || transform.x !== t.x || transform.y !== t.y)
    ) {
      this.setState(
        {
          transform: t
        },
        () => {
          zoom.transform(select(this.node), t); //fix: update the __zoom
        }
      );
    }
  };
  splitChartContent(props, mappingProps, innerOrOuter = "inner", clip = false) {
    let { children, className, margin } = props;

    return (
      <Group
        left={margin.left}
        top={margin.top}
        className={`chart-clip-${innerOrOuter}`}
        clipPath={
          clip && innerOrOuter === "inner"
            ? `url(#chart-clip-path-${this.chartId})`
            : ""
        }
      >
        {React.Children.map(children, el => {
          let nameKey = this.removePrefix(el.type.displayName);
          //skip null
          if (
            el &&
            (innerOrOuter === "inner"
              ? OUTERCONTENTNAMES.indexOf(nameKey) < 0
              : OUTERCONTENTNAMES.indexOf(nameKey) > -1)
          ) {
            return React.cloneElement(el, {
              className: className ? _.kebabCase(className + nameKey) : "", //inject className automatically
              ...mappingProps[nameKey]
            });
          }
        })}
      </Group>
    );
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
      brush,
      x1 = d => d.key, //special prop for group bar chart
      x1Domain,
      x1Scale
    } = this.props;
    let { transform } = this.state;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    xScale.domain(xDomain || extent(data, x)).range(xRange || [0, innerWidth]);
    let transformedXScale = xScale.copy();
    let transformedDomain = null;
    let transformedRange = null;
    if (transform) {
      let isOridalScale =
        !transformedXScale.invert && transformedXScale.bandwidth;
      transformedDomain = isOridalScale
        ? addInvertForScale(xScale.copy()).invertExtent.apply(
            null,
            xScale
              .copy()
              .range()
              .map(transform.invertX, transform)
          )
        : transform.rescaleX(xScale).domain();
      if (transformedDomain) {
        transformedXScale.domain(transformedDomain);
        let r1 = xScale(transformedDomain[0]);
        let r2 = xScale(transformedDomain[1]);
        transformedRange = [isNaN(r1) ? 0 : r1, isNaN(r2) ? 0 : r2];
      }
    }

    yScale
      .domain(yDomain || [0, max(data, y)])
      .range(yRange || [innerHeight, 0]);
    /* special prop for group bar chart */
    x1Domain && x1Scale
      ? x1Scale
          .domain(x1Domain)
          .rangeRound([
            0,
            transformedXScale ? transformedXScale.bandwidth() : 1
          ])
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
        xScale: zoom ? transformedXScale : xScale,
        yScale,
        width: ["auto", "row"].indexOf(grid) > -1 ? innerWidth : 0,
        height: ["auto", "column"].indexOf(grid) > -1 ? innerHeight : 0
      },
      Curve: {
        xScale: transformedXScale,
        yScale
      },
      Area: {
        xScale: transformedXScale,
        yScale
      },
      Bar: {
        left: d => {
          return transformedXScale(x(d)) || 9999;
        },
        top: d => yScale(y(d)),
        width: transformedXScale.bandwidth ? transformedXScale.bandwidth() : 0, //fix xScale.bandwidth() is not a function bug
        height: d => innerHeight - yScale(y(d))
      },
      Stack: {
        childMappingProps: {
          Area: {
            xScale: transformedXScale,
            yScale
          },
          Bar: {
            left: d => transformedXScale(x(d)) || 9999, //to avoid when zooming in, left is undefined
            top: d => yScale(y(d)),
            width: transformedXScale.bandwidth
              ? transformedXScale.bandwidth()
              : 1, //fix xScale.bandwidth() is not a function bug
            height: d => yScale(d[0]) - yScale(d[1])
          }
        }
      },
      Group: {
        left: d => transformedXScale(x(d)) || 9999,
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
    if (brush) {
      let brushHeight = 40;
      let brushScale = yScale.copy().range([brushHeight, 0]);
      let brushX1Scale =
        x1Scale &&
        x1Scale.copy().rangeRound([0, xScale ? xScale.bandwidth() : 1]);
      mappingProps["Brush"] = {
        width: innerWidth,
        move: transformedRange,
        listener: {
          "brush end": this.brushed
        },
        childMappingProps: {
          XAxis: {
            scale: xScale,
            top: brushHeight
          },
          Area: {
            xScale: xScale,
            yScale: brushScale
          },
          Bar: {
            left: d => {
              return xScale(x(d));
            },
            top: d => brushScale(y(d)),
            width: xScale.bandwidth ? xScale.bandwidth() : 0, //fix xScale.bandwidth() is not a function bug
            height: d => brushHeight - brushScale(y(d))
          },
          Curve: {
            xScale: xScale,
            yScale: brushScale
          },
          Stack: {
            childMappingProps: {
              Area: {
                xScale: xScale,
                yScale: brushScale
              },
              Bar: {
                left: d => xScale(x(d)),
                top: d => brushScale(y(d)),
                width: xScale.bandwidth ? xScale.bandwidth() : 1, //fix xScale.bandwidth() is not a function bug
                height: d => brushScale(d[0]) - brushScale(d[1])
              }
            }
          },
          Group: {
            left: d => xScale(x(d)) || 9999,
            childMappingProps: {
              Bar: {
                top: d => brushScale(y(d)),
                left: d => (brushX1Scale && x1 ? x1Scale(x1(d)) : 0),
                width:
                  brushX1Scale && brushX1Scale.bandwidth
                    ? brushX1Scale.bandwidth()
                    : 1,
                height: d => brushHeight - brushScale(y(d))
              }
            }
          }
        }
      };
    }
    let outerClipContent = ["XAxis", "YAxis"];
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
          <ClipPath id={`chart-clip-path-${this.chartId}`}>
            <Rect
              width={innerWidth}
              height={innerHeight}
              fill={"none"}
              left={0}
              top={0}
            />
          </ClipPath>
        ) : null}
        {titleEle}
        {this.splitChartContent(
          this.props,
          mappingProps,
          "inner",
          zoom || clip
        )}
        {this.splitChartContent(
          this.props,
          mappingProps,
          "outer",
          zoom || clip
        )}
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
  clip: PropTypes.bool,
  id: PropTypes.string,
  brush: PropTypes.bool //for caculating  height and margin
};
Chart.defaultProps = {
  ...DEFAULT_PROPS,
  grid: "none",
  zoom: false,
  clip: false,
  brush: false
};
