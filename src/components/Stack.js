import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { stack } from "d3-shape";
import _ from "lodash";
import Group from "./Group";
import {
  PREFIX,
  STACK_OFFSET_MAP,
  STACK_ORDER_MAP,
  ALL_COMMON_PROPTYPES,
  ALL_DEFAULT_PROPS
} from "../constant";

export default class Stack extends Component {
  constructor(props) {
    super(props);
  }
  removePrefix(displayName, prefix = `${PREFIX}`) {
    return displayName ? displayName.slice(prefix.length) : "";
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
      fill,
      childMappingProps,
      ...rest
    } = this.props;
    let stackGenerator = stack();
    !_.isNil(keys) && stackGenerator.keys(keys);
    !_.isNil(value) && stackGenerator.value(value);
    !_.isNil(order) &&
      stackGenerator.order(
        _.isFunction(order) ? order : STACK_ORDER_MAP[order]
      );
    !_.isNil(offset) &&
      stackGenerator.offset(
        _.isFunction(offset) ? offset : STACK_OFFSET_MAP[offset]
      );
    let stackDataArr = stackGenerator(data); //generate data for area or bar
    return (
      <Group
        className={cx(`${PREFIX}-stack-group`, className)}
        left={left}
        top={top}
      >
        {stackDataArr.map((stackData, i) => {
          let displayName = children.displayName || "anonyComponent";
          //clone the children

          return React.cloneElement(
            children,
            {
              key: `stack-${displayName}-${i}`,
              className: cx(
                `stack-${displayName}-${i}`,
                children.props && children.props.className
              ),
              data: stackData,
              fill: _.isFunction(fill)
                ? fill(stackData.key)
                : _.isArray(fill) ? fill[i % fill.length] : fill,
              ...childMappingProps[
                this.removePrefix(children.type.displayName)
              ],
              ...rest
            },
            children.children
          );
        })}
      </Group>
    );
  }
}

Stack.displayName = `${PREFIX}Stack`;
Stack.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired, //requiring single child
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
  childMappingProps: PropTypes.object, //the props must map to child with the specified key while ...rest props is the common props mapping to all the children components
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"]),
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.func])
};
Stack.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
