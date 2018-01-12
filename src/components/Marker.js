import React, { Component } from "react";
import PropTypes, { number } from "prop-types";
import cx from "classnames";
import Group from "./Group";
import Line from "./Line";
import Text from "./Text";
import { PREFIX } from "../constant";

const TEXT_OFFSET = 5;
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
      clipPath,
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
    let defaultTextStyle = {
      x: {
        start: {
          textAnchor: "end",
          left: from.x,
          top: innerHeight - TEXT_OFFSET,
          dx: TEXT_OFFSET,
          angle: 90
        },
        middle: {
          textAnchor: "middle",
          left: from.x,
          top: innerHeight / 2,
          dx: TEXT_OFFSET,
          angle: 90
        },
        end: {
          textAnchor: "start",
          left: from.x,
          top: TEXT_OFFSET,
          dx: TEXT_OFFSET,
          angle: 90
        }
      },
      y: {
        start: {
          textAnchor: "start",
          left: from.x,
          top: from.y - TEXT_OFFSET,
          dx: TEXT_OFFSET
        },
        middle: {
          textAnchor: "middle",
          left: innerWidth / 2,
          top: from.y - TEXT_OFFSET
        },
        end: {
          textAnchor: "end",
          left: innerWidth,
          top: from.y - TEXT_OFFSET,
          dx: -TEXT_OFFSET
        }
      }
    };
    return (
      <Group
        top={top}
        left={left}
        className={cx(`${PREFIX}-marker-group`, className)}
        clipPath={clipPath}
      >
        <Line
          from={from}
          to={to}
          className={`${PREFIX}-marker-line`}
          stroke="red"
          fill="none"
        />
        {_.isString(label) ? (
          <Text
            {...defaultTextStyle[type][labelAnchor]}
            {...textProps}
            className={`${PREFIX}-marker-label`}
          >
            {label}
          </Text>
        ) : (
          label
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
  ...Line.propTypes,
  clipPath: PropTypes.string
};
Marker.defaultProps = {
  ...Line.defaultProps,
  type: "y",
  label: "",
  labelAnchor: "start"
};
