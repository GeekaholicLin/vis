import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Chart from "./Chart";
import { Curve, XAxis, YAxis, Grid, Marker } from "../components/index";
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
        <Grid />
        <Curve
          {...mappingPropsWithKeys(this.props, Object.keys(Curve.propTypes), [
            "left",
            "top"
          ])}
        />
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
        <Marker value={110} label={"平均值"} />
        <Marker type="x" value={new Date("3/1/2016")} />
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
