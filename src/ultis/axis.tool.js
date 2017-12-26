import { XAxis, YAxis } from "../components";
import _ from "lodash";
const skipKeys = ["left", "top", "className", "orientation"];
let axisProcessingKeys = Object.keys(XAxis.propTypes).filter(
  item => skipKeys.indexOf(item) < 0
);
let xKeys = axisProcessingKeys.map(
  key => "x" + key.slice(0, 1).toUpperCase() + key.slice(1)
);
let yKeys = axisProcessingKeys.map(
  key => "y" + key.slice(0, 1).toUpperCase() + key.slice(1)
);
export const axisKeys = {
  x: [...xKeys],
  y: [...yKeys],
  origin: [...axisProcessingKeys]
};
/**
 * @description convert Axis's props prefixing without `x` or `y`
 * @param {object} componentProps
 * @param {string} type {'x','y'}
 * @returns {object} XAxis mapping
 * @example
 *  componentProps: {xTickSizeInner: 3,xTicks: [10,'%']}
 *  type: x
 *  result: {tickSizeInner: 3,ticks: [10,'%']}
 *  and the result can map to XAxis or YAxis easily
 */
export let generateAxisMappingProps = (componentProps, type) => {
  return _.mapKeys(_.pick(componentProps, axisKeys[type]), (value, key) =>
    _.camelCase(key.slice(1))
  );
};

/**
 * @description generate propTypes for XAxis and YAxis depending on Axis
 * @param {object} componentPropTypes
 * @param {string} type {'x','y'}
 * @returns {object} XAxis propTypes or YAxis propTypes
 * @example
 * componentPropTypes: {tickSize: PropTypes.number,tickSizeInner: PropTypes.number}
 * type: 'x'
 * result: {xTickSize: PropTypes.number,xTickSizeInner: PropTypes.number}
 */
export let generateAxisPropTypes = (componentPropTypes, type) => {
  return _.mapKeys(
    _.pick(componentPropTypes, axisKeys["origin"]),
    (value, key) => type + key.slice(0, 1).toUpperCase() + key.slice(1)
  );
};
