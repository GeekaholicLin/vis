import React, { Component } from "react";
import PropTypes from "prop-types";
import { arc } from "d3-shape";
import _ from "lodash";
import cx from "classnames";
import { PREFIX } from "../constant";

export default class Arc extends Comment {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      data,
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
    centroid && arcGenerator.centroid(centroid);
    innerRadius && arcGenerator.innerRadius(innerRadius);
    outerRadius && arcGenerator.outerRadius(outerRadius);
    cornerRadius && arcGenerator.cornerRadius(cornerRadius);
    startAngle && arcGenerator.startAngle(startAngle);
    endAngle && arcGenerator.endAngle(endAngle);
    padAngle && arcGenerator.endAngle(padAngle);
    padRadius && arcGenerator.padRadius(padRadius);
    return (
      <path
        className={cx(`${PREFIX}-arc`, className)}
        d={arcGenerator()}
        {...rest}
      />
    );
  }
}

Arc.displayName = `${PREFIX}-Arc`;
Arc.PropTypes = {
  className: PropTypes.string,
  centroid: PropTypes.any,
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  cornerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  startAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  endAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  padRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};
Arc.defaultProps = {};
