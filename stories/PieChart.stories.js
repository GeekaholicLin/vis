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
import { schemeCategory20, scaleLinear, scaleBand } from "d3-scale";
import { extent, max } from "d3-array";
import { SYMBOLS_MAP } from "../src/constant/d3.constant";

import {
  ChartProvider,
  XAxis,
  YAxis,
  Pie,
  Grid,
  Marker,
  Zoom,
  Brush,
  Legend
} from "../src/HOC";

const margin = { top: 50, right: 50, bottom: 30, left: 50 };
const chartWidthOptions = {
  range: true,
  min: 500,
  max: 800,
  step: 20
};
const innerRadiusOptions = {
  range: true,
  min: 0,
  max: 100,
  step: 20
};
const outerRadiusOptions = {
  range: true,
  min: 150,
  max: 180,
  step: 10
};
const cornerRadiusOptions = {
  range: true,
  min: 0,
  max: 10,
  step: 2
};
let pieData = [
  { value: 335, name: "直达" },
  { value: 310, name: "邮件营销" },
  { value: 234, name: "联盟广告" },
  { value: 135, name: "视频广告" },
  { value: 1048, name: "百度" },
  { value: 251, name: "谷歌" },
  { value: 147, name: "必应" },
  { value: 102, name: "其他" }
];
let pieLegnedSettings = {
  type: "nameKey",
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
  title: "pie legend",
  titleStyl: { color: "#000" },
  inactiveColor: "#fff"
};
storiesOf("PieChart", module)
  .addDecorator(withKnobs)
  .add("simple PieChart or NutChart", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", pieData)}
      >
        <Pie
          innerRadius={number("innerRadius: ", 0, innerRadiusOptions)}
          outerRadius={number("outerRadius: ", 150, outerRadiusOptions)}
          cornerRadius={number("cornerRadius: ", 0, cornerRadiusOptions)}
          dataKey={"value"}
          fill={schemeCategory20}
        />
      </ChartProvider>
    );
  })
  .add("PieChart or NutChart with Legend", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", pieData)}
      >
        <Pie
          innerRadius={number("innerRadius: ", 0, innerRadiusOptions)}
          outerRadius={number("outerRadius: ", 150, outerRadiusOptions)}
          cornerRadius={number("cornerRadius: ", 0, cornerRadiusOptions)}
          nameKey={"name"}
          dataKey={"value"}
          fill={schemeCategory20}
        />
        <Legend {...pieLegnedSettings} />
      </ChartProvider>
    );
  });
