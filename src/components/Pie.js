import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { arc, pie } from "d3-shape";
import _ from "lodash";
import Group from "./Group";
import Arc from "./Arc";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
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
      value,
      sort,
      sortValue,
      startAngle,
      endAngle,
      padAngle,
      centroid,
      innerRadius,
      outerRadius,
      cornerRadius,
      padRadius,
      color,
      ...rest
    } = this.props;
    let arcGenerator = arc();
    arcGenerator.innerRadius(innerRadius);
    !_.isNil(outerRadius) && arcGenerator.outerRadius(outerRadius);
    !_.isNil(cornerRadius) && arcGenerator.cornerRadius(cornerRadius);
    !_.isNil(padRadius) && arcGenerator.padRadius(padRadius);
    !_.isNil(startAngle) && arcGenerator.startAngle(startAngle);
    !_.isNil(endAngle) && arcGenerator.endAngle(endAngle);
    let pieGenerator = pie();
    !_.isNil(sort) && pieGenerator.sort(sort);
    !_.isNil(value) && pieGenerator.value(value);
    !_.isNil(sortValue) && pieGenerator.sortValue(sortValue);
    !_.isNil(padAngle) && pieGenerator.padAngle(padAngle);
    let pieArcs = pieGenerator(data);
    return (
      <Group
        className={cx(`${PREFIX}-pie-group`, className)}
        top={top}
        left={left}
      >
        {pieArcs.map((pieArc, i) => {
          return (
            <path
              key={`${PREFIX}-pie-arc-${i}`}
              className={`${PREFIX}-pie-arc`}
              d={arcGenerator(pieArc)}
              {...rest}
              fill={_.isFunction(color) ? color(pieArc.data) : color}
            />
          );
        })}
      </Group>
    );
  }
}
Pie.displayName = `${PREFIX}Pie`;
Pie.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
  sortValue: PropTypes.func,
  startAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  endAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  ...Arc.propTypes,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top", "color"])
};
Pie.defaultProps = {
  innerRadius: 0,
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
