import _ from "lodash";
import React from "react";
import { STACK_ORDER_MAP, STACK_OFFSET_MAP } from "constant";

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
/**
 * get wrappedComponent displayName for easy debugging
 * @param {*} WrappedComponent
 */
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function getChartColors(colors = ["steelblue"], namespace = "") {
  return _.isArray(colors)
    ? colors.map(
        (el, i) =>
          _.isString(el)
            ? el
            : `url('#${namespace ? namespace + "-" : ""}${el.props.id}')`
      )
    : _.isString(colors)
      ? colors
      : `url('#${namespace ? namespace + "-" : ""}${colors.props.id}')`;
}
export function renderStaticComponentWithId(components, namespace = "") {
  let componentsArr = _.isArray(components) ? components : [components];
  return componentsArr.map(
    (component, i) =>
      React.isValidElement(component) &&
      React.cloneElement(component, {
        key: `static-component-render-${i}`,
        id: namespace + "-" + component.props.id //change id
      })
  );
}

/**
 * misc
 */
/**
 * return the key wrapper
 * @param {string or func} key
 * @param {object} data
 * if key is function,return it
 * or key is string, return a wrapper function with data as args
 */
export function keyWrapper(key) {
  let wrapper = key => data => data[key];
  return _.isFunction(key) ? key : wrapper(key);
}
/**
 *
 * @param {string or func} func
 * @param {object} data
 * if key is function ,exec it with data
 * or if key is not function ,return it directly
 */
export function valueGetter(func, data) {
  return _.isFunction(func) ? func(data) : func;
}
/**
 * giving key name or key function, get the relative data array
 * @param {string or func} key
 * @param {array} data
 */
export function getValuesArrByKeyOrFunc(key, dataArr = []) {
  return dataArr.map(d => (_.isFunction(key) ? key(d) : d[key]));
}
/**
 * giving key name or key function, get the relative data
 * @param {string or func} key
 * @param {object} data
 */
export function getValueByKeyOrFunc(key, data) {
  return _.isFunction(key) ? key(data) : data[key];
}

/**
 * return originalProps when dataKey is undefined
 * Or return merged object
 * @param {string or function} dataKey
 * @param {object} originalProps
 */
export function generatePropsWithDataKey(dataKey, originalProps = {}) {
  if (dataKey) {
    return Object.assign({}, originalProps, {
      y: {
        [dataKey]: keyWrapper(dataKey)
      }
    });
  } else return originalProps;
}
