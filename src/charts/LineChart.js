import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
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
    this.chartId = this.props.id || _.uniqueId("__line-chart__");
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
        <Marker value={110} label={"平均值"} labelAnchor="start" />
        <Marker
          type="x"
          label={"最小年月"}
          labelAnchor="middle"
          value={new Date("2/1/2016")}
        />
        <Marker
          type="x"
          label={"最大年月"}
          labelAnchor="middle"
          value={new Date("2/1/2017")}
        />
      </Chart>
    );
  }
}
LineChart.displayName = `${PREFIX}LineChart`;
LineChart.propTypes = {
  ...Chart.propTypes, //chart
  defined: PropTypes.func, //curve
  curve: PropTypes.func,
  id: PropTypes.string,
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y") //yAxis
};
LineChart.defaultProps = {
  ...Chart.defaultProps
};
