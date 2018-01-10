import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { PREFIX, ALL_COMMON_PROPTYPES, ALL_DEFAULT_PROPS } from "../constant";
export default class ClipPath extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { id, children, className, ...rest } = this.props;
    return (
      <defs>
        <clipPath
          id={id}
          className={cx(`${PREFIX}-clippath`, className)}
          {...rest}
        >
          {children}
        </clipPath>
      </defs>
    );
  }
}
ClipPath.displayName = `${PREFIX}Clippath`;
ClipPath.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
ClipPath.defaultProps = {};
