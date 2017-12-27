import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { generateAxisPropTypes, mappingPropsWithKeys } from "../ultis";
import { SVG, Group, Pie } from "../components/index";
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
      color,
      data,
      innerRadius,
      outerRadius
    } = this.props;
    return (
      <SVG
        className={cx(`${PREFIX}-bar-chart`, className)}
        width={width}
        height={height}
      >
        <Group left={width / 2} top={height / 2}>
          <Pie
            {...mappingPropsWithKeys(this.props, Object.keys(Pie.propTypes), [
              "left",
              "top"
            ])}
            className="pie-chart"
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
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  ...generateAxisPropTypes(Pie.propTypes, ["left", "top"])
};
PieChart.defaultProps = {
  ...DEFAULT_PROPS
};
