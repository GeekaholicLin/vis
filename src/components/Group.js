import React from "react";
import { PropTypes, func } from "prop-types";
import { PREFIX } from "../constant";
import classNames from "classnames";

export default function(props) {
  const { className, children, ...rest } = props;
  const groupClass = classNames(`${PREFIX}-group`, className);
  return (
    <g className={groupClass} {...rest}>
      {children}
    </g>
  );
}
