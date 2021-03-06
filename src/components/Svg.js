import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import cx from "classnames";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
export default class SVG extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { className, children, left, top, getInnerRef, ...rest } = this.props;
    return (
      <svg
        className={cx(`${PREFIX}-svg`, className)}
        ref={node => getInnerRef(node)}
        style={{
          transform: `translate(${left}px,${top}px)`
        }}
        {...rest}
      >
        {children}
      </svg>
    );
  }
}
SVG.displayName = `${PREFIX}SVG`;
SVG.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  ..._.pick(ALL_COMMON_PROPTYPES, ["left", "top"]),
  getInnerRef: PropTypes.func
};
SVG.defaultProps = {
  ..._.pick(ALL_DEFAULT_PROPS, ["width", "height", "left", "top"]),
  getInnerRef: () => {}
};
