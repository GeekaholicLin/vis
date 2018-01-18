import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { arc, pie } from "d3-shape";
import _ from "lodash";
import Group from "./Group";
import Arc from "./Arc";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
export default class Pie extends PureComponent {
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
      sortValues,
      startAngle,
      endAngle,
      padAngle,
      centroid,
      innerRadius,
      outerRadius,
      cornerRadius,
      padRadius,
      fill,
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
    !_.isNil(sortValues) && pieGenerator.sortValues(sortValues);
    !_.isNil(padAngle) && pieGenerator.padAngle(padAngle);
    let pieArcs = pieGenerator(data);
    console.log("pieArcs", pieArcs);
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
              fill={
                _.isFunction(fill)
                  ? fill(pieArc.data)
                  : _.isArray(fill) ? fill[i % fill.length] : fill
              }
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
  sortValues: PropTypes.func,
  startAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  endAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  ...Arc.propTypes,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"]),
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.func])
};
Pie.defaultProps = {
  innerRadius: 0,
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"]),
  stroke: "white",
  sortValues: (a, b) => 0 //do not sort pie by values, just original order
};
