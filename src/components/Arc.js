import React, { Component } from "react";
import PropTypes from "prop-types";
import { arc } from "d3-shape";
import _ from "lodash";
import cx from "classnames";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";

export default class Arc extends Comment {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
      left,
      top,
      centroid,
      innerRadius,
      outerRadius,
      cornerRadius,
      startAngle,
      endAngle,
      padAngle,
      padRadius,
      ...rest
    } = this.props;
    let arcGenerator = arc();
    !_.isNil(centroid) && arcGenerator.centroid(centroid);
    !_.isNil(innerRadius) && arcGenerator.innerRadius(innerRadius);
    !_.isNil(outerRadius) && arcGenerator.outerRadius(outerRadius);
    !_.isNil(cornerRadius) && arcGenerator.cornerRadius(cornerRadius);
    !_.isNil(startAngle) && arcGenerator.startAngle(startAngle);
    !_.isNil(endAngle) && arcGenerator.endAngle(endAngle);
    !_.isNil(padAngle) && arcGenerator.endAngle(padAngle);
    !_.isNil(padRadius) && arcGenerator.padRadius(padRadius);
    return (
      <path
        className={cx(`${PREFIX}-arc`, className)}
        d={arcGenerator()}
        transform={`translate(${left},${top})`}
        {...rest}
      />
    );
  }
}

Arc.displayName = `${PREFIX}Arc`;
Arc.PropTypes = {
  className: PropTypes.string,
  centroid: PropTypes.any,
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  cornerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  startAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  endAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"])
};
Arc.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
