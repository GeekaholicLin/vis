import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
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
  }
  render() {
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        <Area
          {...mappingPropsWithKeys(this.props, Object.keys(Area.propTypes), [
            "left",
            "top"
          ])}
          y1={this.props.y1 || this.props.y}
          fill={"steelblue"}
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
  ...generateAxisPropTypes(YAxis.propTypes, "y") //yAxis
};
AreaChart.defaultProps = {
  ...Chart.defaultProps,
  y0: () => 0
};
