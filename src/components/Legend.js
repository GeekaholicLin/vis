import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import D3Symbol from "./D3Symbol";
import { PREFIX } from "../constant";

export default class Legend extends Component {
  constructor(props) {
    super(props);
    let { items } = this.props;
    this.state = {
      selectedArr: items.map(d => !!d.selected)
    };
  }

  handleLegendItemClick = obj => {
    let { selectedArr } = this.state;
    let { onLegendItemClick } = this.props;
    let { index } = obj;
    let newArr = [...selectedArr];
    newArr[index] = !selectedArr[index];
    this.setState(
      {
        selectedArr: [...newArr]
      },
      () => {
        onLegendItemClick &&
          onLegendItemClick({
            ...obj,
            selected: !selectedArr[index]
          });
      }
    );
  };
  render() {
    let { selectedArr } = this.state;

    let {
      className,
      style,
      orientation,
      title,
      titleStyle,
      items,
      inactiveColor,
      clickable,
      onLegendTitleClick,
      onLegendItemClick
    } = this.props;
    return (
      <div className={cx(`${PREFIX}-legend`, className)} style={{ ...style }}>
        <h3
          className={`${PREFIX}-legend-title`}
          style={{
            margin: "0 0 10px 0",
            ...titleStyle,
            cursor: onLegendTitleClick ? "pointer" : "auto"
          }}
          onClick={e => (onLegendTitleClick ? onLegendTitleClick(e) : null)}
        >
          {title}
        </h3>
        <ul
          className={`${PREFIX}-legend-item-wrap`}
          style={{
            margin: "0",
            padding: "0",
            display: "flex",
            flexDirection: orientation === "vertical" ? "column" : "row"
          }}
        >
          {items.map((item, i) => {
            let { name, icon, iconProps, label, labelStyle } = item;
            let isSelected = selectedArr[i];
            return (
              <li
                className={cx(
                  `${PREFIX}-legend-item`,
                  isSelected ? "selected" : "unselected"
                )}
                key={`legend-item-${name}-${i}`}
                style={{
                  cursor: clickable ? "pointer" : "auto",
                  listStyle: "none",
                  display: "flex",
                  marginTop: i === 0 ? "0" : "5px"
                }}
                onClick={e =>
                  onLegendItemClick || clickable
                    ? this.handleLegendItemClick({
                        index: i,
                        event: e,
                        ...item
                      })
                    : null
                }
              >
                <div
                  className="legend-item-shape"
                  style={{
                    marginRight: "10px"
                  }}
                >
                  {_.isFunction(icon) ? (
                    icon({
                      index: i,
                      ...item,
                      selected: isSelected,
                      inactiveColor
                    })
                  ) : (
                    <D3Symbol
                      className="legend-item-shape-icon"
                      type={icon}
                      top={2}
                      {...iconProps}
                      fill={
                        isSelected
                          ? iconProps && iconProps["fill"]
                          : inactiveColor
                      }
                    />
                  )}
                </div>
                <div
                  className="legend-item-label"
                  style={{
                    ...labelStyle,
                    color: isSelected
                      ? labelStyle && labelStyle["color"]
                      : inactiveColor
                  }}
                  title={_.isString(label) && label}
                  data-title={_.isString(label) && label}
                >
                  {_.isFunction(label)
                    ? label({
                        index: i,
                        ...item,
                        selected: isSelected,
                        inactiveColor
                      })
                    : label}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const dataPropType = PropTypes.shape({
  name: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  iconProps: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  labelStyle: PropTypes.object,
  selected: PropTypes.bool
});
Legend.displayName = `${PREFIX}Legend`;
Legend.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  clickable: PropTypes.bool,
  inactiveColor: PropTypes.string,
  items: PropTypes.arrayOf(dataPropType),
  onLegendTitleClick: PropTypes.func,
  onLegendItemClick: PropTypes.func
};
Legend.defaultProps = {
  style: {
    position: "absolute",
    right: 50,
    top: 0,
    width: 100,
    padding: "10px",
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: "5px",
    boxSizing: "border-box",
    border: "1px solid rgba(0,0,0,0.95)"
  },
  orientation: "vertical",
  clickable: true,
  inactiveColor: "#ccc"
};
