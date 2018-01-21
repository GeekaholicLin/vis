import _ from "lodash";
import React from "react";
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
function keyWrapper(key, data) {
  return _.isFunction(key) ? key : data => data[key];
}
/**
 *
 * @param {string or func} func
 * @param {object} data
 * if key is function ,exec it with data
 * or if key is not function ,return it directly
 */
function valueGetter(func, data) {
  return _.isFunction(func) ? func(data) : func;
}
/**
 * giving key name or key function, get the relative data
 * @param {string or func} key
 * @param {object} data
 */
export function getValuesArrByKeyOrFunc(key, dataArr = []) {
  return dataArr.map(d => (_.isFunction(key) ? key(d) : d[key]));
}
export function getValueByKeyOrFunc(key, data) {
  return _.isFunction(key) ? key(data) : data[key];
}

export function hoistAxisPropsToProvider(axisComponent) {
  let id = axisComponent.props.id || axisComponent.displayName;
  let orientation = axisComponent.props.orientation;
  return {
    scale: axisComponent.props.scale
  };
}
