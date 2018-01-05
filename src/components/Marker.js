import React, { Component } from "react";
import PropTypes, { number } from "prop-types";
import cx from "classnames";
import Group from "./Group";
import Line from "./Line";
import Text from "./Text";
import { PREFIX } from "../constant";

export default class Marker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      type,
      value,
      top,
      left,
      label,
      labelAnchor,
      xScale, //get from Chat Component
      yScale,
      width,
      height,
      innerWidth,
      innerHeight,
      ...textProps
    } = this.props;
    let isKeyFromX = type === "x";
    let scaleMap = {
      x: xScale,
      y: yScale
    };
    let from = {
      x: isKeyFromX ? xScale(value) : 0,
      y: isKeyFromX ? 0 : yScale(value)
    };
    let to = {
      x: isKeyFromX ? xScale(value) : innerWidth,
      y: isKeyFromX ? innerHeight : yScale(value)
    };
    return (
      <Group
        top={top}
        left={left}
        className={cx(`${PREFIX}-marker-group`, className)}
      >
        <Line
          from={from}
          to={to}
          className={`${PREFIX}-marker-line`}
          stroke="red"
          fill="none"
        />
        {_.isString(label) ? (
          <svg fill="#ccc" stroke="none">
            <Text
              left={from.x}
              top={from.y}
              {...textProps}
              className={`${PREFIX}-marker-label`}
            >
              {label}
            </Text>
          </svg>
        ) : (
          { label }
        )}
      </Group>
    );
  }
}
Marker.displayName = `${PREFIX}Marker`;
Marker.propTypes = {
  type: PropTypes.oneOf(["x", "y"]),
  value: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  labelAnchor: PropTypes.oneOf(["start", "middle", "end"]),
  ...Line.propTypes
};
Marker.defaultProps = {
  ...Line.defaultProps,
  type: "y",
  stroke: "steelblue",
  strokeWidth: 1,
  label: "",
  labelAnchor: "end"
};
