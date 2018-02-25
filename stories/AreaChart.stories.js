import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  object,
  color,
  text,
  select,
  boolean
} from "@storybook/addon-knobs";
import { schemeCategory20, scaleLinear, scaleTime, scaleBand } from "d3-scale";
import { extent, max } from "d3-array";
import { SYMBOLS_MAP } from "../src/constant/d3.constant";
import {
  ChartProvider,
  XAxis,
  YAxis,
  Curve,
  Area,
  Grid,
  Marker,
  Zoom,
  Brush,
  Legend
} from "../src/HOC";
import { Gradient } from "../src/components";
import { PatternLines } from "@vx/pattern";
import originAreaData from "../src/data/stacked-area";
import { timeParse, timeFormat } from "d3-time-format";
import { Rect, ClipPath } from "../src/components";

const margin = { top: 50, right: 50, bottom: 110, left: 50 };
const chartWidthOptions = {
  range: true,
  min: 500,
  max: 800,
  step: 20
};
let areaLegnedSettings = {
  type: "key",
  width: 100,
  style: {
    position: "absolute",
    right: -100,
    top: 50,
    padding: "10px",
    backgroundColor: "rgba(173, 169, 169, 0.75)",
    borderRadius: "5px",
    boxSizing: "border-box",
    border: "1px solid rgba(0,0,0,0.95)",
    fontSize: "12px"
  },
  title: "bar legend",
  titleStyl: { color: "#000" },
  inactiveColor: "#fff"
};
let areaData = originAreaData.map(d => {
  let n = {};
  n.close = +d["Google Chrome"];
  n.close2 = +d["Firefox"];
  n.degree = ["A", "B", "C", "D", "E", "F"][Math.floor(Math.random() * 6)];
  n.date = _.isObject(d.date) ? d.date : new Date(d.date);
  return n;
});

storiesOf("AreaChart", module)
  .addDecorator(withKnobs)
  .add("simple AreaChart", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color: ", "steelblue")} />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"比例"}
        />
      </ChartProvider>
    );
  })
  .add("simple AreaChart with Line", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color: ", "steelblue")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close"} />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"比例"}
        />
      </ChartProvider>
    );
  })
  .add("simple AreaChart with Marker", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color: ", "steelblue")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close"} />
        <Marker
          value={"30.33"}
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "middle"
          )}
        />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"比例"}
        />
      </ChartProvider>
    );
  })
  .add("with Zoom", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color: ", "steelblue")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close"} />
        <Marker
          value={"30.33"}
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "middle"
          )}
        />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"比例"}
        />
        <Zoom />
      </ChartProvider>
    );
  })
  .add("with Brush", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color: ", "steelblue")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close"} />
        <Marker
          value={"30.33"}
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "middle"
          )}
        />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"比例"}
        />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("with Zoom and Brush", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color: ", "steelblue")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close"} />
        <Marker
          value={"30.33"}
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "middle"
          )}
        />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"比例"}
        />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("multi-area with same scale", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 600, chartWidthOptions)}
        height={500}
        margin={margin}
        data={areaData}
        clip={true}
      >
        <Area dataKey={"close"} fill={color("area color 1: ", "steelblue")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close"} />
        <Area dataKey={"close2"} fill={color("area color 2: ", "#82BBEC")} />
        <Curve stroke={color("line color: ", "#0E5DA0")} dataKey={"close2"} />
        <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
        <YAxis
          dataKey={"close"}
          scale={scaleLinear()}
          tickPadding={0.1}
          label={"所占比例"}
        />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  });
// .add("multi-area with defferent scales", () => {
//   return (
//     <ChartProvider
//       width={number("chart width: ", 600, chartWidthOptions)}
//       height={500}
//       margin={margin}
//       data={areaData}
//       clip={true}
//     >
//       <ClipPath />
//       <Area
//         dataKey={"close"}
//         fill={color("area color 1: ", "steelblue")}
//         yAxisId={"area-close"}
//       />
//       <Curve
//         stroke={color("line color: ", "#0E5DA0")}
//         dataKey={"close"}
//         yAxisId={"area-close"}
//       />
//       <Curve
//         dataKey={"degree"}
//         stroke={color("area color 2: ", "#82BBEC")}
//         yAxisId={"area-degree"}
//       />
//       <Rect width={600} height={500} fill={"yellow"} />
//       <XAxis dataKey={"date"} scale={scaleTime()} label={"时间"} />
//       <YAxis
//         dataKey={"close"}
//         scale={scaleLinear()}
//         tickPadding={0.1}
//         label={"所占比例"}
//         yAxisId={"area-close"}
//       />
//       <YAxis
//         orientation={"right"}
//         dataKey={"degree"}
//         scale={scaleBand()}
//         tickPadding={0.1}
//         label={"所在等级"}
//         yAxisId={"area-degree"}
//       />
//       <Zoom />
//       <Brush top={380} />
//     </ChartProvider>
//   );
// });
