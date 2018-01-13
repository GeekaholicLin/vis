import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
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
    this.chartId = this.props.id || _.uniqueId("__stack-area-chart__");
  }
  render() {
    let { fill } = this.props;
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
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
        <Stack
          {...mappingPropsWithKeys(this.props, Object.keys(Stack.propTypes), [
            "left",
            "top"
          ])}
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
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  fill: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  id: PropTypes.string
};
StackAreaChart.defaultProps = {
  ...Chart.defaultProps
};
