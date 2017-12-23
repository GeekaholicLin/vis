import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { stack, area } from "d3-shape";
import _ from "lodash";
import Group from "./Group";
import { PREFIX, STACK_OFFSET_MAP, STACK_ORDER_MAP } from "../constant";

export default class Stack extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      children,
      left,
      top,
      data,
      keys,
      value,
      order,
      offset,
      color,
      ...rest
    } = this.props;
    let stackGenerator = stack();
    keys && stackGenerator.keys(keys);
    value && stackGenerator.value(value);
    order &&
      stackGenerator.order(
        _.isFunction(order) ? order : STACK_ORDER_MAP[order]
      );
    offset &&
      stackGenerator.offset(
        _.isFunction(offset) ? offset : STACK_OFFSET_MAP[offset]
      );
    let stackDataArr = stackGenerator(data); //generate data for area or bar
    return (
      <Group
        className={cx(`{PREFIX}-stack-group`, className)}
        left={left}
        top={top}
      >
        {stackDataArr.map((stackData, i) => {
          let displayName = children.displayName || "anonyComponent";
          //clone the children
          return React.cloneElement(
            children,
            {
              key: `${PREFIX}-stack-${displayName}-${i}`,
              className: cx(
                `${PREFIX}-stack-${displayName}`,
                children.props.className
              ),
              data: stackData,
              fill: _.isString(color) ? color : color(stackData.key),
              ...rest
            },
            children.children
          );
        })}
      </Group>
    );
  }
}

Stack.displayName = `${PREFIX}-Stack`;
Stack.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired, //requiring single child
  left: PropTypes.number,
  top: PropTypes.number,
  data: PropTypes.array,
  keys: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  order: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(STACK_ORDER_MAP)),
    PropTypes.func
  ]),
  offset: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(STACK_OFFSET_MAP)),
    PropTypes.func
  ]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
Stack.defaultProps = {
  left: 0,
  top: 0
};
