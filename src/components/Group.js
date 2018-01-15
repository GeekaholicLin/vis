import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
import cx from "classnames";

export default class Group extends Component {
  constructor(props) {
    super(props);
  }
  removePrefix(displayName, prefix = `${PREFIX}`) {
    return displayName ? displayName.slice(prefix.length) : "";
  }
  render() {
    const {
      className,
      children,
      data, //special for left and top func
      left,
      top,
      childMappingProps,
      getInnerRef,
      ...rest
    } = this.props;
    return (
      <g
        className={cx(`${PREFIX}-group`, className)}
        transform={`translate(${_.isFunction(left) ? left(data) : left},${
          _.isFunction(top) ? top(data) : top
        })`}
        ref={node => getInnerRef(node)}
        {...rest}
      >
        {childMappingProps
          ? React.Children.map(children, child => {
              if (child) {
                return React.cloneElement(child, {
                  ...childMappingProps[
                    this.removePrefix(children.type.displayName)
                  ]
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
  childMappingProps: PropTypes.object,
  getInnerRef: PropTypes.func
};
Group.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["left", "top"]),
  getInnerRef: () => {}
};
