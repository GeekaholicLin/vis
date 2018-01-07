import PropTypes from "prop-types";

export const DEFAULT_PROPS = {
  width: 960,
  height: 500,
  margin: { top: 30, right: 50, bottom: 30, left: 50 }
};

export const ALL_COMMON_PROPTYPES = {
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export const ALL_DEFAULT_PROPS = {
  width: 960,
  height: 500,
  top: 0,
  left: 0,
  fill: "steelblue",
  stroke: "#000",
  strokeWidth: 2
};
