import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { select, event as currentEvent } from "d3-selection";
import {
  zoom as zoomBehaviorGenerator,
  zoomTransform,
  zoomIdentity
} from "d3-zoom";
import Rect from "./Rect";
import { DEFAULT_PROPS, PREFIX } from "constant";
export default class Zoom extends PureComponent {
  constructor(props) {
    super(props);
    this.zoom = this.getZoomBehavior(this.props);
    this.transform = null;
    this.node = null;
    this.counter = 0;
  }
  componentDidMount() {
    this.zoom(select(this.node));
    this.transform = zoomTransform(this.node);
    this.props.afterMounted(this);
  }
  componentWillReceiveProps(nextProps) {
    //optimize: update zoomBehavior once
    if (nextProps.dataLoaded && this.counter === 0) {
      this.zoom = this.getZoomBehavior(nextProps);
      this.zoom(select(this.node));
      this.counter++;
    }
  }
  componentWillUnmount() {
    let { listener } = this.props;
    let listenerEvents = Object.keys(listener);
    if (listenerEvents.length > 0) {
      listenerEvents.forEach((e, i) => {
        this.zoom.on(e, null);
      });
    }
    this.zoom.on("zoom.__internal__", null);
  }
  getZoomBehavior(props) {
    let { width, height, dataLoaded } = props;
    let {
      constrain,
      filter,
      touchable,
      wheelDelta,
      extent,
      scaleExtent,
      translateExtent,
      clickDistance,
      duration,
      interpolate,
      listener
    } = props;
    let zoomBehavior = zoomBehaviorGenerator();
    //internal init
    zoomBehavior
      .scaleExtent(scaleExtent || [1, Infinity])
      .translateExtent(translateExtent || [[0, 0], [width, height]])
      .extent(extent || [[0, 0], [width, height]]);
    //listen zoom.__internal__ first because listenerEvents can get the latest transform
    zoomBehavior.on("zoom.__internal__", this.zoomed.bind(this));
    if (dataLoaded) {
      let listenerEvents = Object.keys(listener);

      constrain && zoomBehavior.constrain(constrain);
      filter && zoomBehavior.filter(filter);
      touchable && zoomBehavior.touchable(touchable);
      wheelDelta && zoomBehavior.wheelDelta(wheelDelta);
      interpolate && zoomBehavior.interpolate(interpolate);
      !_.isNil(clickDistance) && zoomBehavior.clickDistance(clickDistance);
      !_.isNil(duration) && zoomBehavior.duration(duration);
      if (listenerEvents.length > 0) {
        listenerEvents.forEach((e, i) => {
          zoomBehavior.on(e, listener[e](this));
        });
      }
    }
    return zoomBehavior;
  }
  zoomed() {
    if (currentEvent.sourceEvent && currentEvent.sourceEvent.type === "brush")
      return;
    this.transform = zoomTransform(this.node);
  }
  render() {
    let { className, width, height, left, top } = this.props;
    return (
      <Rect
        className={cx(`${PREFIX}-zoom`, className)}
        width={width}
        height={height}
        left={left}
        top={top}
        fill={"none"}
        getInnerRef={node => (this.node = node)}
        style={{ pointerEvents: "all", cursor: "move" }}
      />
    );
  }
}
Zoom.displayName = `${PREFIX}Zoom`;
Zoom.propTypes = {
  className: PropTypes.string,
  dataLoaded: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  constrain: PropTypes.func, //d3-zoom props
  filter: PropTypes.func,
  touchable: PropTypes.func,
  wheelDelta: PropTypes.func,
  extent: PropTypes.array,
  scaleExtent: PropTypes.array,
  translateExtent: PropTypes.array,
  clickDistance: PropTypes.number,
  duration: PropTypes.number,
  interpolate: PropTypes.func,
  listener: PropTypes.object,
  afterMounted: PropTypes.func
};
Zoom.defaultProps = {
  ...DEFAULT_PROPS,
  listener: {},
  dataLoaded: true, // it is helpful for async data
  afterMounted: () => {}
};
