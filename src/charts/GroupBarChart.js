import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import Chart from "./Chart";
import { Group, Bar, XAxis, YAxis, Stack, Grid } from "../components/index";
import {
  generateAxisMappingProps,
  generateAxisPropTypes,
  generateComponentPropTypes,
  mappingPropsWithKeys
} from "../ultis";
import { scaleBand, scaleOrdinal } from "d3-scale";
import { PREFIX } from "../constant";
export default class GroupBarChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { fill, keys, data } = this.props;
    let x1 = d => d.key;
    let colorItems = _.isArray(fill) ? [...fill] : [fill];
    let colors = colorItems.map(
      (item, i) => (_.isString(item) ? item : `url(#${item.props.id})`)
    ); //check the item is Element or normal color string
    let fillFunc = scaleOrdinal(colors);
    return (
      <Chart
        {...mappingPropsWithKeys(this.props, Object.keys(Chart.propTypes))}
        y={d => d.value}
        x1={x1}
        x1Domain={keys}
        x1Scale={scaleBand().padding(0.05)}
      >
        <Grid />
        {colorItems.map(
          (El, i) =>
            React.isValidElement(El) &&
            React.cloneElement(El, { key: `fill-${i}` })
        )}
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
                fill={d => fillFunc(x1(d))}
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
  fill: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  keys: PropTypes.array.isRequired
};
GroupBarChart.defaultProps = {
  ...Chart.defaultProps
};
