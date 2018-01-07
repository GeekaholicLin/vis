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
    let { fill } = this.props;
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        {React.isValidElement(fill) && !_.isString(fill) && fill}
        <Bar
          {...mappingPropsWithKeys(this.props, Object.keys(Bar.propTypes), [
            "left",
            "top",
            "width",
            "height"
          ])}
          fill={_.isString(fill) ? fill : `url('#${fill.props.id}')`}
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
  ...Chart.propTypes, //override Bar propTypes
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.element]) //do not have PropTypes.func because BarChart is only one color
};
BarChart.defaultProps = {
  ...Chart.defaultProps,
  ...Bar.defaultProps
};
