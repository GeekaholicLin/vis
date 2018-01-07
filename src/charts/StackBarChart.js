import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Chart from "./Chart";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  mappingPropsWithKeys,
  generateComponentPropTypes
} from "../ultis";
import { Bar, XAxis, YAxis, Stack } from "../components/index";
import { PREFIX } from "../constant";
export default class StackBarChart extends Component {
  constructor(props) {
    super(props);
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
              React.cloneElement(Ele, { key: `fill-${i}` })
          )}

        <Stack
          {...mappingPropsWithKeys(this.props, Object.keys(Stack.propTypes), [
            "left",
            "top"
          ])}
          fill={
            _.isArray(fill)
              ? fill.map(
                  (el, i) => (_.isString(el) ? el : `url('#${el.props.id}')`)
                )
              : fill
          }
        >
          <Bar
            {...mappingPropsWithKeys(this.props, Object.keys(Bar.propTypes), [
              "left",
              "top",
              "width",
              "height",
              "fill"
            ])}
          />
        </Stack>
        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
      </Chart>
    );
  }
}

StackBarChart.displayName = `${PREFIX}StackBarChart`;
StackBarChart.propTypes = {
  ...generateComponentPropTypes(Bar.propTypes, ["left", "top"]),
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  ...Chart.propTypes,
  fill: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
StackBarChart.defaultProps = {
  ...Chart.defaultProps,
  ...Bar.defaultProps
};
