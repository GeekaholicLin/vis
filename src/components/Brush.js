import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { brushX } from "d3-brush";
import { select } from "d3-selection";
import Group from "./Group";
import { PREFIX, BRUSH_TYPE_MAP, DEFAULT_PROPS } from "../constant";

export default class Brush extends Component {
  constructor(props) {
    super(props);
    this.brush = null;
    this.move = null;
    this.node = null;
  }

  removePrefix(displayName, prefix = `${PREFIX}`) {
    return displayName ? displayName.slice(prefix.length) : "";
  }
  componentDidMount() {
    let { type, move, filter, extent, width, height, listener } = this.props;
    let defaultMoveProp = {
      x: [0, width],
      y: [0, height],
      xy: [[0, 0], [width, height]]
    };
    let events = Object.keys(listener);
    let brush = BRUSH_TYPE_MAP[type]().extent(
      extent || [[0, 0], [width, height]]
    );
    filter && brush.filter(filter);
    if (events.length > 0) {
      events.forEach((e, i) => {
        brush.on(e, listener[e]);
      });
    }
    brush(select(this.node));
    this.brush = brush;
    this.move = move || defaultMoveProp[type];
    brush.move(select(this.node), this.move);
    console.log("this.move", this.move);
  }
  componentWillUpdate(nextProps) {
    //update move func only when `move` is not equal
    if (_.isArray(nextProps.move) && nextProps.move.length === 2) {
      if (
        nextProps.move[0] === this.move[0] &&
        nextProps.move[1] === this.move[1]
      )
        return;
      this.brush.move(select(this.node), nextProps.move);
      this.move = [...nextProps.move];
    }
  }
  handleRef = node => {
    this.node = node;
  };
  render() {
    let { className, children, left, top, childMappingProps } = this.props;
    return (
      <Group
        className={cx(`${PREFIX}-brush`, className)}
        left={left}
        top={top}
        getInnerRef={this.handleRef}
      >
        {childMappingProps
          ? React.Children.map(children, child => {
              if (child) {
                return React.cloneElement(child, {
                  ...childMappingProps[
                    this.removePrefix(child.type.displayName)
                  ]
                });
              }
            })
          : children}
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
  type: "xy",
  handleSize: 6,
  height: 40,
  width: DEFAULT_PROPS["width"],
  left: 0,
  top: 400,
  listener: {}
};
