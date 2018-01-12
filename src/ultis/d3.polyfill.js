import { range as sequence, bisectRight } from "d3-array";
import { scaleOrdinal } from "d3-scale";
//inspired by d3 bandScale rescale source code
//https://github.com/d3/d3-scale/blob/master/src/band.js#L18
export function getOrinalRange(scale) {
  let n = scale.domain().length,
    range = scale.range(),
    round = scale.round(),
    paddingInner = scale.paddingInner(),
    step = scale.step(),
    bandwidth = scale.bandwidth(),
    align = scale.align();
  let reverse = range[1] < range[0],
    start = range[reverse - 0],
    stop = range[1 - reverse];

  start += (stop - start - step * (n - paddingInner)) * align;
  if (round) start = Math.round(start);
  var values = sequence(n).map(function(i) {
    return start + step * i;
  });
  return reverse ? values.reverse() : values;
}
export function addInvertForScale(scale) {
  scale.invertExtent = function(r0, r1) {
    let domain = scale.domain,
      range = scale.range(),
      bandwidth = scale.bandwidth();
    var lo = +r0,
      hi = arguments.length > 1 ? +r1 : lo,
      reverse = range[1] < range[0],
      values = getOrinalRange(scale),
      n = values.length - 1,
      a,
      b,
      t;

    // order range inputs, bail if outside of scale range
    if (hi < lo) (t = lo), (lo = hi), (hi = t);
    if (hi < values[0] || lo > range[1 - reverse]) return undefined;

    // binary search to index into scale range
    a = Math.max(0, bisectRight(values, lo) - 1);
    b = lo === hi ? a : bisectRight(values, hi) - 1;

    // increment index a if lo is within padding gap
    if (lo - values[a] > bandwidth + 1e-10) ++a;

    if (reverse) (t = a), (a = n - b), (b = n - t); // map + swap
    return a > b ? undefined : domain().slice(a, b + 1);
  };
  return scale;
}
