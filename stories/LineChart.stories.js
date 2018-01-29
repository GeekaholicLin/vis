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

import { ChartProvider, XAxis, YAxis, Curve, Grid } from "../src/HOC";

const lineData = [
  { name: "Mon", value: 820 },
  { name: "Tue", value: 932 },
  { name: "Web", value: 901 },
  { name: "Thu", value: 934 },
  { name: "Fri", value: 1290 },
  { name: "Sat", value: 1330 },
  { name: "Sun", value: 1320 }
];
const withNoDefinedData = [
  { name: "Mon", value: 82 },
  { name: "Tue", value: 92 },
  { name: "Web", value: null },
  { name: "Thu", value: 93 },
  { name: "Fri", value: 129 },
  { name: "Sat", value: 133 },
  { name: "Sun", value: 132 }
];
const margin = { top: 50, right: 50, bottom: 30, left: 50 };
const chartWidthOptions = {
  range: true,
  min: 500,
  max: 800,
  step: 20
};

let customTitle = (
  <svg width="140" height="30" x="230" y="10">
    <a
      style={{ cursor: "pointer" }}
      href="https://www.github.com/GeekaholicLin/vis"
      target="_blank"
    >
      <rect height="30" width="120" y="0" x="0" rx="15" />
      <text fill="white" textAnchor="middle" y="21" x="60">
        折线图
      </text>
    </a>
  </svg>
);
storiesOf("LineChart", module)
  .addDecorator(withKnobs)
  .add("simple LineChart", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", lineData)}
      clip={true}
    >
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("with simple title", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", lineData)}
      clip={true}
      title={text("title: ", "Simple LineChart")}
    >
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("with custom title", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", lineData)}
      clip={true}
      title={customTitle}
    >
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("with grid lines", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", lineData)}
      clip={true}
      title={customTitle}
    >
      <Grid
        grid={select(
          "grid type: ",
          {
            auto: "auto",
            row: "row",
            column: "column"
          },
          "row"
        )}
      />
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("with custom domain", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", lineData)}
      clip={true}
      title={customTitle}
    >
      <Grid
        grid={select(
          "grid type: ",
          {
            auto: "auto",
            row: "row",
            column: "column"
          },
          "row"
        )}
      />
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis
        dataKey={"value"}
        scale={scaleLinear()}
        domain={[600, max(lineData, d => d.value + 10)]}
      />
    </ChartProvider>
  ))
  .add("with undefined data", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", withNoDefinedData)}
      clip={true}
      title={customTitle}
    >
      <Grid
        grid={select(
          "grid type: ",
          {
            auto: "auto",
            row: "row",
            column: "column"
          },
          "row"
        )}
      />
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("without undefined data", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={margin}
      data={object("data: ", withNoDefinedData)}
      clip={true}
      title={customTitle}
    >
      <Grid
        grid={select(
          "grid type: ",
          {
            auto: "auto",
            row: "row",
            column: "column"
          },
          "row"
        )}
      />
      <Curve
        stroke={color("curve stroke color: ", "steelblue")}
        dataKey={"value"}
        defined={d => +d.value === d.value}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ));
