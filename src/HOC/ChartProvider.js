import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { Broadcast } from "react-broadcast";
import { SVG, Group, Text } from "components";
import { DEFAULT_PROPS, PREFIX, CHANNEL } from "constant";
import { renderStaticComponentWithId } from "ultis";
export default class ChartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedState: {},
      mergedProps: {}
    };
  }
  //use it in a callback prop in mappingStateToProps
  //for example onLegendItemClick
  updateStateInContext(updatedState) {
    this.setState({
      updatedState: updatedState
    });
  }
  addPropsToContext(context) {
    this.setState({
      mergedProps: context
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
      title,
      children,
      ...contextProps
    } = this.props;
    let { width, height, margin, fill, chartNamespace } = contextProps;
    let { updatedState, mergedProps } = this.state;
    let titleEle = _.isString(title) ? (
      <Text
        fontSize={20}
        verticalAnchor="start"
        top={10}
        left={innerWidth / 2 + margin.left}
        textAnchor="middle"
      >
        {title}
      </Text>
    ) : (
      title
    );
    return (
      <Broadcast
        channel={channel}
        compareValues={compareValues}
        value={{
          ...contextProps,
          ...mergedProps,
          __updateStateInContext__: this.updateStateInContext.bind(this),
          __addedPropsToContext__: this.addPropsToContext.bind(this),
          __updated__: updatedState
        }}
      >
        <div
          className={cx(`${PREFIX}-chart-provider-wrapper`, className)}
          style={{ position: "relative", width, height, ...wrapperStyle }}
          id={id}
        >
          <SVG width={width} height={height} {...wrapperProps}>
            {renderStaticComponentWithId(fill, chartNamespace)}
            {titleEle}
            <Group left={margin.left} top={margin.top}>
              {React.Children.map(children, child => {
                if (child && child.props && child.props.__outside__ !== true) {
                  return child;
                }
              })}
            </Group>
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
