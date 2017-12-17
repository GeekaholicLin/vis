import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { arc, pie } from "d3-shape";
import { Group } from "./Group";
import { PREFIX } from "../constant";
export default class Pie extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
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
      ...rest
    } = this.props;
    let arcGenerator = arc();
    centroid && arcGenerator.centroid(centroid);
    innerRadius && arcGenerator.innerRadius(innerRadius);
    outerRadius && arcGenerator.outerRadius(outerRadius);
    cornerRadius && arcGenerator.cornerRadius(cornerRadius);
    padRadius && arcGenerator.padRadius(padRadius);
    let pieGenerator = pie();
    pieSort && pieGenerator.sort(pieSort);
    pieValue && pieGenerator.value(pieValue);
    padAngle && pieGenerator.padAngle(padAngle);
    let pieArcs = pieGenerator(data);
    return (
      <Group className={cx(`${PREFIX}-pie`, className)} top={top} left={left}>
        {pieArcs.map((pieArc, i) => {
          return (
            <path
              key={`${PREFIX}-pie-arc-${i}`}
              className={`${PREFIX}-pie-arc`}
              d={arcGenerator(pieArc)}
            />
          );
        })}
      </Group>
    );
  }
}
Pie.displayName = `${PREFIX}-Pie`;
Pie.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
  centroid: PropTypes.any, //arc
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  cornerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.func]), //pie
  sort: PropTypes.func,
  sortValue: PropTypes.func,
  startAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  endAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};
Pie.defaultProps = {
  top: 0,
  left: 0,
  innerRadius: 0
};
