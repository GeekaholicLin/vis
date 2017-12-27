import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Chart from "./Chart";
import { Curve, XAxis, YAxis } from "../components/index";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  mappingPropsWithKeys
} from "../ultis";
import { PREFIX } from "../constant";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        <Curve
          {...mappingPropsWithKeys(this.props, Object.keys(Curve.propTypes), [
            "left",
            "top"
          ])}
        />
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
      </Chart>
    );
  }
}
LineChart.displayName = `${PREFIX}LineChart`;
LineChart.propTypes = {
  ...Chart.propTypes, //chart
  defined: PropTypes.func, //curve
  curve: PropTypes.func,
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y") //yAxis
};
LineChart.defaultProps = {
  ...Chart.defaultProps
};
