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

import {
  ChartProvider,
  XAxis,
  YAxis,
  Curve,
  Grid,
  Marker,
  Zoom,
  Brush
} from "../src/HOC";

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
const multiLines = [
  { name: "Mon", value: 820, score: 500, class: "a" },
  { name: "Tue", value: 932, score: 450, class: "c" },
  { name: "Web", value: 901, score: 480, class: "d" },
  { name: "Thu", value: 934, score: 300, class: "b" },
  { name: "Fri", value: 1290, score: 1000, class: "f" },
  { name: "Sat", value: 1330, score: 700, class: "h" },
  { name: "Sun", value: 1320, score: 800, class: "g" }
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
  ))
  .add("with horizontal Marker", () => (
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
      <Marker
        value={
          lineData.reduce((total, data, index) => (total += data.value), 0) /
          lineData.length
        }
        label={"平均值"}
        labelAnchor={select(
          "horizontal Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "start"
        )}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("with vertical Marker", () => (
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
      <Marker
        type="x"
        value={select(
          "vertical Marker value: ",
          lineData.reduce((obj, data, index) => {
            obj = Object.assign({}, obj, { [data.name]: data.name });
            return obj;
          }, {})
        )}
        label={"日期"}
        labelAnchor={select(
          "vertical Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "start"
        )}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
    </ChartProvider>
  ))
  .add("with Zoom", () => (
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
      <Marker
        value={
          lineData.reduce((total, data, index) => (total += data.value), 0) /
          lineData.length
        }
        label={"平均值"}
        labelAnchor={select(
          "horizontal Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "start"
        )}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
      <Zoom />
    </ChartProvider>
  ))
  .add("with Brush", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={{ top: 50, right: 50, bottom: 110, left: 50 }}
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
      <Marker
        value={
          lineData.reduce((total, data, index) => (total += data.value), 0) /
          lineData.length
        }
        label={"平均值"}
        labelAnchor={select(
          "horizontal Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "start"
        )}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
      <Brush top={380} />
    </ChartProvider>
  ))
  .add("with Zoom and Brush", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={{ top: 50, right: 50, bottom: 110, left: 50 }}
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
      <Marker
        value={
          lineData.reduce((total, data, index) => (total += data.value), 0) /
          lineData.length
        }
        label={"平均值"}
        labelAnchor={select(
          "horizontal Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "start"
        )}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
      <Zoom />
      <Brush top={380} />
    </ChartProvider>
  ))
  .add("multi-lines with the same scale", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={{ top: 50, right: 50, bottom: 110, left: 50 }}
      data={object("data: ", multiLines)}
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
        stroke={color("curve1 stroke color: ", "steelblue")}
        dataKey={"value"}
      />
      <Curve
        stroke={color("curve2 stroke color: ", "purple")}
        dataKey={"score"}
      />
      <Marker
        value={
          multiLines.reduce((total, data, index) => (total += data.value), 0) /
          multiLines.length
        }
        label={"蓝色平均值"}
        labelAnchor={select(
          "horizontal blue Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "start"
        )}
        stroke={"steelblue"}
      />
      <Marker
        value={
          multiLines.reduce((total, data, index) => (total += data.score), 0) /
          multiLines.length
        }
        label={"紫色平均值"}
        labelAnchor={select(
          "horizontal purple Marker label anchor: ",
          {
            start: "start",
            middle: "middle",
            end: "end"
          },
          "middle"
        )}
        stroke={"purple"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis dataKey={"value"} scale={scaleLinear()} />
      <Zoom />
      <Brush top={380} />
    </ChartProvider>
  ))
  .add("multi-lines with different scales", () => (
    <ChartProvider
      width={number("chart width: ", 500, chartWidthOptions)}
      height={500}
      margin={{ top: 50, right: 50, bottom: 110, left: 50 }}
      data={object("data: ", multiLines)}
      clip={true}
      title={customTitle}
    >
      <Curve
        stroke={color("curve1 stroke color: ", "steelblue")}
        dataKey={"value"}
        yAxisId={"value"}
      />
      <Curve
        stroke={color("curve2 stroke color: ", "purple")}
        dataKey={"score"}
        yAxisId={"value"}
      />
      <Curve
        stroke={color("curve3 stroke color: ", "blue")}
        dataKey={"class"}
        yAxisId={"class"}
      />
      <XAxis dataKey={"name"} scale={scaleBand()} />
      <YAxis
        dataKey={"class"}
        yAxisId={"class"}
        scale={scaleBand()}
        domain={multiLines.map(obj => obj.class).sort()}
        orientation={"right"}
      />
      <YAxis dataKey={"value"} yAxisId={"value"} scale={scaleLinear()} />
      <Zoom />
      <Brush top={380} />
    </ChartProvider>
  ));
