import React, { Component } from "react";
import PropTypes from "prop-types";
import Svg from "../components/Svg";
import Group from "../components/Group";
import { PREFIX, ORIENTATION, SCALES } from "../constant";

export default class LineChart extends Chart {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, width, height, margin } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    let t = `translate(${margin.left},${margin.top})`;
    return (
      <Svg className={className} width={width} height={height}>
        <Group transform={t} />
      </Svg>
    );
  }
}
LineChart.displayName = `${PREFIX}-LineChart`;
LineChart.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
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
  className: `${PREFIX}-LineChart`,
  width: 800,
  height: 800,
  margin: { top: 50, right: 50, bottom: 50, left: 50 }
};
