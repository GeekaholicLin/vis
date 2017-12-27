import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Chart from "./Chart";
import { Group, Bar, XAxis, YAxis, Stack } from "../components/index";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  generateComponentPropTypes,
  mappingPropsWithKeys
} from "../ultis";
import { scaleBand } from "d3-scale";
import { PREFIX } from "../constant";
export default class GroupBarChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { color, keys, data } = this.props;
    let x1 = d => d.key;
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
        y={d => d.value}
        x1={x1}
        x1Domain={keys}
        x1Scale={scaleBand().padding(0.05)}
      >
        {data.map((barGroupArr, i) => {
          return (
            <Group
              data={barGroupArr}
              className={`grouped-bar-category-${i}`}
              key={`grouped-bar-category-${i}`}
            >
              <Bar
                data={keys.map(cate => ({
                  key: cate,
                  value: barGroupArr[cate]
                }))}
                color={d => color(x1(d))}
              />
            </Group>
          );
        })}

        <XAxis {...generateAxisMappingProps(this.props, "x")} />
        <YAxis {...generateAxisMappingProps(this.props, "y")} />
      </Chart>
    );
  }
}

GroupBarChart.displayName = `${PREFIX}GroupBarChart`;
GroupBarChart.propTypes = {
  ...Chart.propTypes,
  ...generateAxisPropTypes(XAxis.propTypes, "x"), //xAxis
  ...generateAxisPropTypes(YAxis.propTypes, "y"), //yAxis
  ...generateComponentPropTypes(Bar.propTypes, ["left"], ["top"]),
  color: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired
};
GroupBarChart.defaultProps = {
  ...Chart.defaultProps
};
