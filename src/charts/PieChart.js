import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { generateAxisPropTypes, mappingPropsWithKeys } from "../ultis";
import { SVG, Group, Pie } from "../components/index";
import { PREFIX, DEFAULT_PROPS } from "../constant";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = this.props.id || _.uniqueId("__pie-chart__");
  }
  render() {
    let {
      className,
      width,
      height,
      fill,
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
        {_.isArray(fill) &&
          fill.map(
            (Ele, i) =>
              React.isValidElement(Ele) &&
              React.cloneElement(Ele, {
                key: `fill-${i}`,
                id: this.chartId + "-" + Ele.props.id
              })
          )}
        <Group left={width / 2} top={height / 2}>
          <Pie
            {...mappingPropsWithKeys(this.props, Object.keys(Pie.propTypes), [
              "left",
              "top"
            ])}
            className="pie-chart"
            fill={
              _.isArray(fill)
                ? fill.map(
                    (el, i) =>
                      _.isString(el)
                        ? el
                        : `url('#${this.chartId}-${el.props.id}')`
                  )
                : fill
            }
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
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  ...generateAxisPropTypes(Pie.propTypes, ["left", "top"])
};
PieChart.defaultProps = {
  ...DEFAULT_PROPS
};
