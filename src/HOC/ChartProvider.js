import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Broadcast } from "react-broadcast";
import { SVG } from "../components";
import { DEFAULT_PROPS, PREFIX, CHANNEL } from "../constant";
export default function ChartProvider({
  channel,
  compareValues,
  id,
  className,
  wrapperStyle,
  wrapperProps,
  children,
  ...contextProps
}) {
  let { width, height } = contextProps;
  return (
    <Broadcast
      channel={channel}
      compareValues={compareValues}
      value={contextProps}
    >
      <div
        className={cx(`${PREFIX}-chart-provider-wrapper`, className)}
        style={{ position: "relative", width, height, ...wrapperStyle }}
        id={id}
      >
        <SVG width={width} height={height} {...wrapperProps}>
          {children}
        </SVG>
      </div>
    </Broadcast>
  );
}
ChartProvider.displayName = `${PREFIX}ChartProvider`;
ChartProvider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
ChartProvider.defaultProps = {
  ...DEFAULT_PROPS,
  channel: CHANNEL
};
