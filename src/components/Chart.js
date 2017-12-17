import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Chart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      layout,
      height,
      width,
      margin,
      data,
      xScale,
      yScale,
      children,
      xDomain,
      yDomain,
      xRange,
      yRange,

      ...rest
    } = this.props;
    let mapToChildrenProps = {};
    //TODO: not complete
    let mappedChildren = React.Children.map(this.props.children, el => {
      if (React.isValidElement(el)) {
        return React.cloneElement(el, {}, el.children);
      } else return null;
    });
    return (
      <svg {...rest}>
        <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
      </svg>
    );
  }
}
Chart.displayName = "vis-Chart";
Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.oneOf(PropTypes.number, PropTypes.string),
    right: PropTypes.oneOf(PropTypes.number, PropTypes.string),
    bottom: PropTypes.oneOf(PropTypes.number, PropTypes.string),
    left: PropTypes.oneOf(PropTypes.number, PropTypes.string)
  })
};
