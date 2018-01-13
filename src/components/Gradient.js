import React, { Component } from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import { PREFIX } from "../constant";
export default class Gradient extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      className,
      children,
      type,
      id,
      from,
      to,
      cx,
      cy,
      r,
      fx,
      fy,
      colors,
      opacities,
      ...rest //gradientTransform and spreadMethod and so on
    } = this.props;
    let length = Math.max(2, colors.length);
    let Ele = type === "linear" ? `linearGradient` : `radialGradient`;
    let dynamicProps = {
      linear: {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y
      },
      radial: {
        cx,
        cy,
        fx,
        fy,
        r
      }
    };
    return (
      <defs>
        <Ele
          className={cls(`${PREFIX}-gradient`, className)}
          id={id}
          {...dynamicProps[type]}
          {...rest}
        >
          {children
            ? children
            : colors.map((color, i) => {
                return (
                  <stop
                    key={`gradient-stop-el-${i}`}
                    offset={(i / (length - 1)).toFixed(2) * 100 + "%"}
                    stopOpacity={opacities[i] || 1}
                    stopColor={color}
                  />
                );
              })}
        </Ele>
      </defs>
    );
  }
}
Gradient.displayName = `${PREFIX}Gradient`;
Gradient.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["linear", "radial"]),
  from: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }), //vector
  to: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  cx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  colors: PropTypes.array,
  opacities: PropTypes.array
};
Gradient.defaultProps = {
  type: "linear",
  from: { x: 0, y: 0 },
  to: { x: 1, y: 1 }, // from top left to right bottom
  cx: "50%",
  cy: "50%",
  r: "100%",
  fx: "50%",
  fy: "50%",
  colors: [],
  opacities: []
};
