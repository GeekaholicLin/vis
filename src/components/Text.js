/**
 * Thanks techniq for his awesome component named react-svg-text
 * Only change some api,x=>lerf and y=>top,
 * and add vis className
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Text from "react-svg-text";
import { PREFIX } from "../constant";

export default class Text extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { left, top, className, ...rest } = this.props;
    return (
      <Text
        className={cx(`{PREFIX}-text`, className)}
        x={left}
        y={top}
        {...rest}
      />
    );
  }
}
Text.displayName = `${PREFIX}-Text`;
Text.propTypes = {
  className: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  lineHeight: PropTypes.string,
  capHeight: PropTypes.string,
  scaleToFit: PropTypes.bool,
  textAnchor: PropTypes.oneOf(["start", "middle", "end", "inherit"]),
  verticalAnchor: PropTypes.oneOf(["start", "middle", "end"])
};
Text.defaultProps = {
  left: 0,
  top: 0,
  dx: 0,
  dy: 0,
  lineHeight: "1em",
  capHeight: "0.71em", // Magic number from d3
  scaleToFit: false,
  textAnchor: "start",
  verticalAnchor: "end" // default SVG behavior
};
