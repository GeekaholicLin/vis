import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { Broadcast } from "react-broadcast";
import { SVG, Group, Text, ClipPath, Rect } from "components";
import { DEFAULT_PROPS, PREFIX, CHANNEL } from "constant";
import { renderStaticComponentWithId } from "ultis";
export default class ChartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedState: {},
      mergedProps: {},
      originProps: { ...props }
    };
    this.hoistingProps = {};
    this.updateHoistingProps(this.props);
  }
  updateHoistingProps(props) {
    React.Children.map(this.props.children, child => {
      if (child && child.props && _.isFunction(child.props.__hoistingProps__)) {
        //maybe this.props as second args is helpful
        this.hoistingProps = Object.assign(
          {},
          this.hoistingProps,
          child.props.__hoistingProps__(child.props, props)
        );
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    //optimize: normally its data changes in ChartProvider, like async data
    if (nextProps.data && nextProps.data.length !== this.props.data.length) {
      this.updateHoistingProps(nextProps);
    }
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
  splitChartContent(props, innerOrOuter = "inner", clip = false) {
    let { children, margin, chartNamespace } = props;
    return (
      <Group
        left={margin.left}
        top={margin.top}
        className={`chart-clip-${innerOrOuter}`}
        clipPath={
          clip && innerOrOuter === "inner"
            ? `url(#${chartNamespace}-clip-path)`
            : ""
        }
      >
        {React.Children.map(children, child => {
          //skip null(child)
          //skip not svg element(child.props.__outside__)
          //render conditionally
          //if innerOrOuter === "inner", render inner(child.props.__clip__ === "inner")
          if (
            child &&
            child.props &&
            child.props.__outside__ !== true &&
            (innerOrOuter === "inner"
              ? child.props.__clip__ === "inner"
              : child.props.__clip__ === "outer")
          ) {
            return child;
          }
        })}
      </Group>
    );
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
      clip,
      ...contextProps
    } = this.props;
    let { width, height, margin, fill, chartNamespace } = contextProps;
    let { updatedState, mergedProps, originProps } = this.state;
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;
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
          ...this.hoistingProps, //lowest props. subscriber components' __hoistingProps__ object when initing subscribers
          ...contextProps, // context props which can provide to subscriber
          ...mergedProps, // added object by __addedPropsToContext__ api
          __updatedState__: updatedState, // sometimes it is helpful handle chart-scoped event like onLegendItemClick updating chart state
          __originalProps__: originProps, // the original this.props of ChartProvider
          __updateStateInContext__: this.updateStateInContext.bind(this), // api for subscriber to change context
          __addedPropsToContext__: this.addPropsToContext.bind(this) // api for subscriber to change context.Use it in callback function
        }}
      >
        <div
          className={cx(`${PREFIX}-chart-provider-wrapper`, className)}
          style={{ position: "relative", width, height, ...wrapperStyle }}
          id={id}
        >
          <SVG width={width} height={height} {...wrapperProps}>
            {renderStaticComponentWithId(fill, chartNamespace)}
            <ClipPath id={`${chartNamespace}-clip-path`}>
              <Rect
                width={innerWidth}
                height={innerHeight}
                fill={"none"}
                left={0}
                top={0}
              />
            </ClipPath>
            {titleEle}
            {this.splitChartContent(this.props, "inner", clip)}
            {this.splitChartContent(this.props, "outer", clip)}
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
