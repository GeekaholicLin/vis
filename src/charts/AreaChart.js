import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import Chart from "./Chart";
import { Area, XAxis, YAxis, Group } from "../components";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  mappingPropsWithKeys,
  generateComponentPropTypes
} from "../ultis";
import { PREFIX } from "../constant";
export default class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = this.props.id || _.uniqueId("__area-chart__");
  }
  render() {
    let { fill } = this.props;
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        {React.isValidElement(fill) &&
          !_.isString(fill) &&
          React.cloneElement(fill, {
            id: this.chartId + "-" + fill.props.id
          })}
        <Area
          {...mappingPropsWithKeys(this.props, Object.keys(Area.propTypes), [
            "left",
            "top"
          ])}
          y1={this.props.y1 || this.props.y}
          fill={
            _.isString(fill) ? fill : `url('#${this.chartId}-${fill.props.id}')`
          }
          stroke={"none"}
        />
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
      </Chart>
    );
  }
}

AreaChart.displayName = `${PREFIX}AreaChart`;
AreaChart.propTypes = {
  ...Chart.propTypes,
  ...generateComponentPropTypes(Area.propTypes, ["left", "top"]),
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), //do not have PropTypes.func because AreaChart is only one color
  id: PropTypes.string
};
AreaChart.defaultProps = {
  ...Chart.defaultProps,
  y0: () => 0
};
