import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
import cx from "classnames";

export default class Group extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      className,
      children,
      data, //special for left and top func
      left,
      top,
      childMappingProps,
      ...rest
    } = this.props;
    return (
      <g
        className={cx(`${PREFIX}-group`, className)}
        transform={`translate(${_.isFunction(left) ? left(data) : left},${
          _.isFunction(top) ? top(data) : top
        })`}
        {...rest}
      >
        {childMappingProps
          ? React.Children.map(children, child => {
              if (child) {
                return React.cloneElement(child, {
                  ...childMappingProps[child.type.name]
                });
              }
            })
          : children}
      </g>
    );
  }
}
Group.displayName = `${PREFIX}Group`;
Group.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  left: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.func
  ]),
  top: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.func
  ]),
  childMappingProps: PropTypes.object
};
Group.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"])
};
