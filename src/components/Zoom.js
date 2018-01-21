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
    this.zoom = this.getZoomBehavior(props.zoom);
    this.transform = null;
    this.node = null;
  }
  componentDidMount() {
    this.zoom(select(this.node));
    this.transform = zoomTransform(this.node);
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
  getZoomBehavior(zoom) {
    let { width, height } = this.props;
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
    } = this.props;
    let zoomBehavior = zoomBehaviorGenerator();
    let listenerEvents = Object.keys(listener);

    constrain && zoomBehavior.constrain(constrain);
    filter && zoomBehavior.filter(filter);
    touchable && zoomBehavior.touchable(touchable);
    wheelDelta && zoomBehavior.wheelDelta(wheelDelta);
    interpolate && zoomBehavior.interpolate(interpolate);
    !_.isNil(clickDistance) && zoomBehavior.clickDistance(clickDistance);
    !_.isNil(duration) && zoomBehavior.duration(duration);

    zoomBehavior
      .scaleExtent(scaleExtent || [1, Infinity])
      .translateExtent(translateExtent || [[0, 0], [width, height]])
      .extent(extent || [[0, 0], [width, height]]);
    zoomBehavior.on("zoom.__internal__", this.zoomed.bind(this));
    if (listenerEvents.length > 0) {
      listenerEvents.forEach((e, i) => {
        zoomBehavior.on(e, listener[e](this));
      });
    }
    return zoomBehavior;
  }
  zoomed() {
    if (currentEvent.sourceEvent && currentEvent.sourceEvent.type === "brush")
      return;
    this.zoom(select(this.node));
    this.transform = zoomTransform(this.node);
    console.log("this.transform ", this.transform);
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
  listener: PropTypes.object
};
Zoom.defaultProps = {
  ...DEFAULT_PROPS,
  listener: {}
};
