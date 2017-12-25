import PropTypes from "prop-types";

export const DEFAULT_PROPS = {
  width: 960,
  height: 500,
  margin: { top: 30, right: 30, bottom: 30, left: 30 }
};

export const ALL_COMMON_PROPTYPES = {
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
