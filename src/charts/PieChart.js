import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { generateAxisPropTypes, mappingPropsWithKeys } from "../ultis";
import { SVG, Group, Pie, Legend, Gradient } from "../components/index";
import { PREFIX, DEFAULT_PROPS } from "../constant";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [...props.data]
    };
    this.chartId = this.props.id || _.uniqueId("__pie-chart__");
  }

  handleLegendItemClick = ({ index, selected }) => {
    let { data } = this.state;
    let { data: originData } = this.props;
    let result = [...data];
    result[index] = selected ? originData[index] : 0;
    this.setState({
      data: [...result]
    });
  };
  render() {
    let {
      className,
      width,
      height,
      fill,
      innerRadius,
      outerRadius
    } = this.props;
    let { data } = this.state;
    let processFill = _.isArray(fill)
      ? fill.map(
          (el, i) =>
            _.isString(el) ? el : `url('#${this.chartId}-${el.props.id}')`
        )
      : fill;
    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <SVG
          className={cx(`${PREFIX}-bar-chart`, className)}
          width={width}
          height={height}
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
          <Group left={width / 2} top={height / 2}>
            <Pie
              {...mappingPropsWithKeys(this.props, Object.keys(Pie.propTypes), [
                "left",
                "top",
                "data"
              ])}
              className="pie-chart"
              fill={processFill}
              data={data}
            />
          </Group>
        </SVG>
        <Legend
          title="饼图图例"
          items={data.map((d, i) => {
            return {
              name: "饼图" + i,
              iconProps: {
                fill: _.isFunction(processFill)
                  ? processFill(d)
                  : _.isArray(processFill)
                    ? processFill[i % processFill.length]
                    : processFill
              },
              label: "饼图" + i,
              selected: true
            };
          })}
          onLegendItemClick={this.handleLegendItemClick}
        />
      </div>
    );
  }
}

PieChart.displayName = `${PREFIX}-PieChart`;
PieChart.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  ...generateAxisPropTypes(Pie.propTypes, ["left", "top"])
};
PieChart.defaultProps = {
  ...DEFAULT_PROPS
};
