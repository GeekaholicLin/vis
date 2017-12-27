import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Bar, XAxis, YAxis } from "../components/index";
import Chart from "./Chart";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  mappingPropsWithKeys,
  generateComponentPropTypes
} from "../ultis";
import { PREFIX } from "../constant";
export default class BarChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        <Bar
          {...mappingPropsWithKeys(this.props, Object.keys(Bar.propTypes), [
            "left",
            "top",
            "width",
            "height"
          ])}
        />
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
      </Chart>
    );
  }
}

BarChart.displayName = `${PREFIX}BarChart`;
BarChart.propTypes = {
  ...generateComponentPropTypes(Bar.propTypes, ["left", "top"]),
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  ...Chart.propTypes //override Bar propTypes
};
BarChart.defaultProps = {
  ...Chart.defaultProps,
  ...Bar.defaultProps
};
