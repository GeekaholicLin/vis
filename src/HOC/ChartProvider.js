import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import { Broadcast } from "react-broadcast";
import { SVG, Group, Text, ClipPath, Rect } from "components";
import { DEFAULT_PROPS, PREFIX, CHARTCHANNEL } from "constant";
import { renderStaticComponentWithId } from "ultis";
export default class ChartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedState: {},
      mergedProps: {}
    };
    this.hoistingProps = {};
    this.originalProps = {};
    this.updateHoistingProps(this.props);
  }
  updateHoistingProps(props) {
    React.Children.map(props.children, child => {
      if (child && child.props && _.isFunction(child.props.__hoistingProps__)) {
        //maybe this.props as second args is helpful(for XAxisHOC and YAxisHOC etc.)
        // if (child.props.test) {
        //   debugger;
        // }
        this.hoistingProps = _.merge(
          {},
          this.hoistingProps,
          child.props.__hoistingProps__(child.props, props)
        );
        this.originalProps = _.merge({}, this.hoistingProps, props);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    //optimize: normally its data changes in ChartProvider, like async data
    //remove the optimize because the child async state
    // if (nextProps.data && nextProps.data.length !== this.props.data.length) {
    this.updateHoistingProps(nextProps);
    // }
  }
  //use it in a callback prop in mappingStateToProps
  //for example onLegendItemClick
  updateStateInContext(updatedState) {
    //must use setState not this.updatedState to re-render boardcast values
    this.setState(prevState => {
      return {
        updatedState: Object.assign({}, prevState.updatedState, updatedState)
      };
    });
  }
  addPropsToContext(mergedProps) {
    this.setState(prevState => {
      return {
        mergedProps: Object.assign({}, prevState.mergedProps, mergedProps)
      };
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
          //skip not svg element(child.props.__notSvg__)
          //render conditionally
          //if innerOrOuter === "inner", render inner(child.props.__clip__ === "inner")
          if (
            child &&
            child.props &&
            child.props.__notSvg__ !== true &&
            (innerOrOuter === "inner"
              ? child.props.__clip__ !== "outer"
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
      ...componentProps
    } = this.props;
    let { width, height, margin, fill, chartNamespace } = componentProps;
    let { updatedState, mergedProps } = this.state;
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
          ...this.hoistingProps, // lowest props. provided by XAxisHOC etc. which has __hoistingProps__ property
          ...componentProps, // original on-component props which can provide to subscriber
          ...mergedProps, // added object by __addedPropsToContext__ api
          // sometimes it is helpful handle chart-scoped event like onLegendItemClick updating chart state
          __updatedState__: { ...updatedState },
          // props combined by hoistingProps and contextProps, which is not changed or updated
          __originalProps__: { ...this.originalProps },

          // the following two api is a export function to subscriber to change provider
          // api for subscriber to change provider __updatedState__
          // it is just like a chart-scoped state
          __updateStateInContext__: this.updateStateInContext.bind(this),
          // api for subscriber to change mergedProps.Use it in callback function.
          // Mostly it is used to override provider props like xScale
          // to force re-render component which based on chart context props
          __addedPropsToContext__: this.addPropsToContext.bind(this)
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
                height={innerHeight + 20}
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
            if (child && child.props && child.props.__notSvg__ === true) {
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
  channel: CHARTCHANNEL,
  chartNamespace: _.uniqueId("__chart__")
};
