import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SVG from "../components/SVG";
import Group from "../components/Group";
import { PREFIX, ORIENTATION, SCALES } from "../constant";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, children, width, height, margin } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    return (
      <SVG
        className={cx(`${PREFIX}-linechart`, className)}
        width={width}
        height={height}
      >
        <Group transform={`translate(${margin.left},${margin.top})`}>
          {children}
        </Group>
      </SVG>
    );
  }
}
LineChart.displayName = `${PREFIX}-LineChart`;
LineChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  children: PropTypes.node
};
LineChart.defaultProps = {
  width: 960,
  height: 500,
  margin: { top: 50, right: 50, bottom: 50, left: 50 }
};
