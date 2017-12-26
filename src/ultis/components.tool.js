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
