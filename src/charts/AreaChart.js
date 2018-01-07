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
    let { fill } = this.props;
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
      >
        {React.isValidElement(fill) && !_.isString(fill) && fill}
        <Area
          {...mappingPropsWithKeys(this.props, Object.keys(Area.propTypes), [
            "left",
            "top"
          ])}
          y1={this.props.y1 || this.props.y}
          fill={_.isString(fill) ? fill : `url('#${fill.props.id}')`}
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
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.element]) //do not have PropTypes.func because AreaChart is only one color
};
AreaChart.defaultProps = {
  ...Chart.defaultProps,
  y0: () => 0
};
