import { axisTop, axisRight, axisBottom, axisLeft } from "d3-axis";
import {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye,
  stackOrderAscending,
  stackOrderDescending,
  stackOrderInsideOut,
  stackOrderNone,
  stackOrderReverse,
  stackOffsetDiverging,
  stackOffsetExpand,
  stackOffsetNone,
  stackOffsetSilhouette,
  stackOffsetWiggle
} from "d3-shape";
import { brushX, brushY, brush } from "d3-brush";
export const SCALES = [
  "auto",
  "linear",
  "pow",
  "sqrt",
  "log",
  "identity",
  "time",
  "band",
  "point",
  "ordinal",
  "quantile",
  "quantize",
  "utcTime",
  "sequential",
  "threshold"
];
export const SYMBOLS_MAP = {
  circle: symbolCircle,
  cross: symbolCross,
  diamond: symbolDiamond,
  square: symbolSquare,
  star: symbolStar,
  triangle: symbolTriangle,
  wye: symbolWye
};
export const STACK_ORDER_MAP = {
  ascnding: stackOrderAscending,
  descending: stackOrderDescending,
  insideout: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse
};
export const STACK_OFFSET_MAP = {
  deverging: stackOffsetDiverging,
  expand: stackOffsetExpand,
  node: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle
};
export const AXIS_ORIENTATION_MAP = {
  top: axisTop,
  right: axisRight,
  left: axisLeft,
  bottom: axisBottom
};
export const BRUSH_TYPE_MAP = {
  x: brushX,
  y: brushY,
  xy: brush
};
