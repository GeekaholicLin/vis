import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SVG from "../components/SVG";
import Group from "../components/Group";
import { Pie } from "../components/index";
import { PREFIX, DEFAULT_PROPS } from "../constant";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      width,
      height,
      margin,
      data,
      top,
      left,
      centroid,
      innerRadius,
      outerRadius,
      cornerRadius,
      padRadius,
      value,
      sort,
      sortValue,
      startAngle,
      endAngle,
      padAngle,
      color
    } = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    return (
      <SVG
        className={cx(`${PREFIX}-bar-chart`, className)}
        width={width}
        height={height}
      >
        <Group transform={`translate(${innerWidth / 2},${innerHeight / 2})`}>
          <Pie
            className="pie-chart"
            data={data}
            top={top}
            left={left}
            centroid={centroid}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            cornerRadius={cornerRadius}
            padRadius={padRadius}
            value={value}
            sort={sort}
            sortValue={sortValue}
            startAngle={startAngle}
            endAngle={endAngle}
            padAngle={padAngle}
            stroke={"white"}
            color={color}
          />
        </Group>
      </SVG>
    );
  }
}

PieChart.displayName = `${PREFIX}-PieChart`;
PieChart.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  color: PropTypes.oneOfType(PropTypes.string, PropTypes.func),
  ...Pie.propTypes
};
PieChart.defaultProps = {
  ...DEFAULT_PROPS
};
