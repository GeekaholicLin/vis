import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { select } from "d3-selection";
import Group from "./Group";
import { PREFIX, BRUSH_TYPE_MAP, DEFAULT_PROPS } from "../constant";

export default class Brush extends Component {
  constructor(props) {
    super(props);
    this.brush = null;
    this.move = null;
    this.node = null;
    this.defaultMoveProp = null;
    this.counter = 0;
  }

  componentDidMount() {
    let {
      type,
      move,
      filter,
      handleSize,
      extent,
      width,
      height,
      dataLoaded
    } = this.props;
    let defaultMoveProp = {
      x: [0, width],
      y: [0, height],
      xy: [[0, 0], [width, height]]
    };
    this.brush = BRUSH_TYPE_MAP[type]().extent(
      extent || [[0, 0], [width, height]]
    );
    filter && this.brush.filter(filter);
    handleSize && this.brush.handleSize(handleSize);
    if (dataLoaded) {
      this.updateListener(this.brush, this.props);
    }
    this.move = move || defaultMoveProp[type];
    this.brush(select(this.node));
    this.brush.move(select(this.node), this.move);
    this.defaultMoveProp = defaultMoveProp;
  }
  componentWillUpdate(nextProps) {
    //update move func only when `move` is not equal
    if (_.isArray(nextProps.move) && nextProps.move.length === 2) {
      if (
        nextProps.move[0] === this.move[0] &&
        nextProps.move[1] === this.move[1]
      )
        return;
      if (nextProps.dataLoaded && this.counter === 0) {
        this.updateListener(this.brush, nextProps);
        this.counter++;
      }
      this.brush.move(select(this.node), nextProps.move);
      this.move = [...nextProps.move];
    }
  }
  componentWillUnmount() {
    let { listener } = this.props;
    let events = Object.keys(listener);
    if (events.length > 0) {
      events.forEach((e, i) => {
        this.brush.on(e, null);
      });
    }
  }
  updateListener(brush, props) {
    let { listener } = props;
    let events = Object.keys(listener);
    if (events.length > 0) {
      events.forEach(e => {
        brush.on(e, listener[e](this));
      });
    }
  }
  render() {
    let { className, children, left, top } = this.props;
    return (
      <Group
        className={cx(`${PREFIX}-brush`, className)}
        left={left}
        top={top}
        getInnerRef={node => {
          this.node = node;
        }}
      >
        {children}
      </Group>
    );
  }
}

Brush.displayName = `${PREFIX}Brush`;
Brush.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["x", "y", "xy"]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  move: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  extent: PropTypes.array,
  filter: PropTypes.func,
  handleSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  listener: PropTypes.object,
  childMappingProps: PropTypes.object
};
Brush.defaultProps = {
  type: "x",
  handleSize: 6,
  height: 40,
  width: DEFAULT_PROPS["width"],
  left: 0,
  top: 400,
  listener: {},
  dataLoaded: true
};
