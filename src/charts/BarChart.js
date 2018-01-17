import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { Bar, XAxis, YAxis, Grid, Brush } from "../components/index";
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
    this.chartId = this.props.id || _.uniqueId("__bar-chart__");
  }
  render() {
    let { fill } = this.props;
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        <Grid />

        {React.isValidElement(fill) &&
          !_.isString(fill) &&
          React.cloneElement(fill, {
            id: this.chartId + "-" + fill.props.id
          })}
        <Bar
          {...mappingPropsWithKeys(this.props, Object.keys(Bar.propTypes), [
            "left",
            "top",
            "width",
            "height"
          ])}
          fill={
            _.isString(fill) ? fill : `url('#${this.chartId}-${fill.props.id}')`
          }
        />
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
        <Brush type="x">
          <Bar
            {...mappingPropsWithKeys(this.props, Object.keys(Bar.propTypes), [
              "left",
              "top",
              "width",
              "height"
            ])}
            fill={
              _.isString(fill)
                ? fill
                : `url('#${this.chartId}-${fill.props.id}')`
            }
          />
          <XAxis {...generateAxisMappingProps(this.props, "x")} />
        </Brush>
      </Chart>
    );
  }
}

BarChart.displayName = `${PREFIX}BarChart`;
BarChart.propTypes = {
  ...generateComponentPropTypes(Bar.propTypes, ["left", "top"]),
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  ...Chart.propTypes, //override Bar propTypes
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), //do not have PropTypes.func because BarChart is only one color
  id: PropTypes.string
};
BarChart.defaultProps = {
  ...Chart.defaultProps,
  ...Bar.defaultProps
};
