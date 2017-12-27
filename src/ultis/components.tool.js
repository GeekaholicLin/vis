import _ from "lodash";
/**
 * @description
 * return object that with keys of componentKeys depending on componentProps
 * @param {object} componentProps
 * @param {array} componentKeys
 * @param {array=[]} skipComponentKeys
 * @example
 * componentProps: {a:'a',b:'b',c:'c'}
 * componentKeys: ['a','b']
 * skipComponentKeys: ['b]
 * result: {a: 'a'}
 */
export let mappingPropsWithKeys = (
  componentProps,
  componentKeys,
  skipComponentKeys = []
) => {
  return _.pick(
    componentProps,
    componentKeys.filter(item => skipComponentKeys.indexOf(item) < 0)
  );
};
/**
 * @description generate propTypes for component
 * @param {object} componentPropTypes
 * @param {array} skipComponentKeys {'x','y'}
 * @returns {object} component propTypes
 * @example
 * componentPropTypes: {tickSize: PropTypes.number,tickSizeInner: PropTypes.number}
 * type: ['tickSize']
 * result: {tickSizeInner: PropTypes.number}
 */
export let generateComponentPropTypes = (
  componentPropTypes,
  skipComponentKeys = []
) => {
  return _.pick(
    componentPropTypes,
    Object.keys(componentPropTypes).filter(
      key => skipComponentKeys.indexOf(key) < 0
    )
  );
};
