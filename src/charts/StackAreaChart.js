import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Chart from "./Chart";
import { Area, XAxis, YAxis, Stack } from "../components/index";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  mappingPropsWithKeys,
  generateComponentPropTypes
} from "../ultis";
import { PREFIX } from "../constant";
export default class StackAreaChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        <Stack
          {...mappingPropsWithKeys(this.props, Object.keys(Stack.propTypes), [
            "left",
            "top"
          ])}
        >
          <Area
            {...mappingPropsWithKeys(this.props, Object.keys(Area.propTypes), [
              "left",
              "top"
            ])}
          />
        </Stack>
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
      </Chart>
    );
  }
}

StackAreaChart.displayName = `${PREFIX}StackAreaChart`;
StackAreaChart.propTypes = {
  ...Chart.propTypes,
  ...generateComponentPropTypes(Area.propTypes, ["left", "top"]),
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y") //yAxis
};
StackAreaChart.defaultProps = {
  ...Chart.defaultProps
};
