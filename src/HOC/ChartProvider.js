import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { Broadcast } from "react-broadcast";
import { SVG } from "components";
import { DEFAULT_PROPS, PREFIX, CHANNEL } from "constant";
import { renderStaticComponentWithId } from "ultis";
export default class ChartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overrideProps: {}
    };
  }
  //use it in a callback prop in mappingStateToProps
  //for example onLegendItemClick
  updateBroadcast(obj) {
    this.setState({
      overrideProps: obj
    });
  }
  render() {
    let {
      channel,
      compareValues,
      id,
      className,
      wrapperStyle,
      wrapperProps,
      children,
      ...contextProps
    } = this.props;
    let { width, height, fill, chartNamespace } = contextProps;
    let { overrideProps } = this.state;
    return (
      <Broadcast
        channel={channel}
        compareValues={compareValues}
        value={{
          ...contextProps,
          __updateBroadcast__: this.updateBroadcast.bind(this),
          __updatedProps__: overrideProps
        }}
      >
        <div
          className={cx(`${PREFIX}-chart-provider-wrapper`, className)}
          style={{ position: "relative", width, height, ...wrapperStyle }}
          id={id}
        >
          <SVG width={width} height={height} {...wrapperProps}>
            {renderStaticComponentWithId(fill, chartNamespace)}
            {React.Children.map(children, child => {
              if (child && child.props && child.props.__outside__ !== true) {
                return child;
              }
            })}
          </SVG>
          {React.Children.map(children, child => {
            if (child && child.props && child.props.__outside__ === true) {
              return child;
            }
          })}
        </div>
      </Broadcast>
    );
  }
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
  channel: CHANNEL,
  chartNamespace: _.uniqueId("__chart__")
};
