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
  Bar,
  Grid,
  Marker,
  Zoom,
  Brush,
  Legend
} from "../src/HOC";
import { PatternLines } from "@vx/pattern";

const margin = { top: 50, right: 50, bottom: 110, left: 50 };
const chartWidthOptions = {
  range: true,
  min: 500,
  max: 800,
  step: 20
};
const barData = [
  {
    Education: "Associate's",
    "25 to 34 years old": 3620,
    "35 to 44 years old": 4134,
    "45 to 54 years old": 4195,
    "55 to 64 years old": 2957,
    "65 years old & over": 2026,
    class: "A"
  },
  {
    Education: "Bachelor's",
    "25 to 34 years old": 8920,
    "35 to 44 years old": 8599,
    "45 to 54 years old": 8143,
    "55 to 64 years old": 6059,
    "65 years old & over": 4675,
    class: "A"
  },
  {
    Education: "Master's",
    "25 to 34 years old": 2480,
    "35 to 44 years old": 3302,
    "45 to 54 years old": 3316,
    "55 to 64 years old": 3326,
    "65 years old & over": 2539,
    class: "B"
  },
  {
    Education: "Professional",
    "25 to 34 years old": 501,
    "35 to 44 years old": 709,
    "45 to 54 years old": 789,
    "55 to 64 years old": 705,
    "65 years old & over": 499,
    class: "C"
  },
  {
    Education: "Doctorate",
    "25 to 34 years old": 306,
    "35 to 44 years old": 480,
    "45 to 54 years old": 558,
    "55 to 64 years old": 593,
    "65 years old & over": 541,
    class: "D"
  }
];
let barKeyObject = {
  "25 to 34 years old": "25 to 34 years old",
  "35 to 44 years old": "35 to 44 years old",
  "45 to 54 years old": "45 to 54 years old",
  "55 to 64 years old": "55 to 64 years old",
  "65 years old & over": "65 years old & over"
};
let barLegnedSettings = {
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

storiesOf("BarChart", module)
  .addDecorator(withKnobs)
  .add("simple BarChart", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        clip={true}
      >
        <Bar
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          fill={color("bar color: ", "steelblue")}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          scale={scaleLinear()}
          tickPadding={0.1}
        />
      </ChartProvider>
    );
  })
  .add("with basic features like LineChart", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        <Bar
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          fill={color("bar color: ", "steelblue")}
        />

        <Marker
          value={
            barData.reduce(
              (total, data, index) =>
                (total +=
                  data[
                    select(
                      "steelblue data key: ",
                      barKeyObject,
                      "25 to 34 years old"
                    )
                  ]),
              0
            ) / barData.length
          }
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "end"
          )}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          scale={scaleLinear()}
          tickPadding={0.1}
        />
      </ChartProvider>
    );
  })
  .add("with Zoom", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        <Bar
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          fill={color("bar color: ", "steelblue")}
        />

        <Marker
          value={
            barData.reduce(
              (total, data, index) =>
                (total +=
                  data[
                    select(
                      "steelblue data key: ",
                      barKeyObject,
                      "25 to 34 years old"
                    )
                  ]),
              0
            ) / barData.length
          }
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "end"
          )}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          scale={scaleLinear()}
          tickPadding={0.1}
        />
        <Zoom />
      </ChartProvider>
    );
  })
  .add("with Brush", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        <Bar
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          fill={color("bar color: ", "steelblue")}
        />

        <Marker
          value={
            barData.reduce(
              (total, data, index) =>
                (total +=
                  data[
                    select(
                      "steelblue data key: ",
                      barKeyObject,
                      "25 to 34 years old"
                    )
                  ]),
              0
            ) / barData.length
          }
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "end"
          )}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          scale={scaleLinear()}
          tickPadding={0.1}
        />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("with Zoom and Brush", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        <Bar
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          fill={color("bar color: ", "steelblue")}
        />

        <Marker
          value={
            barData.reduce(
              (total, data, index) =>
                (total +=
                  data[
                    select(
                      "steelblue data key: ",
                      barKeyObject,
                      "25 to 34 years old"
                    )
                  ]),
              0
            ) / barData.length
          }
          label={"平均值"}
          labelAnchor={select(
            "horizontal Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "end"
          )}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          scale={scaleLinear()}
          tickPadding={0.1}
        />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("[bug] multi-bars with the same scale", () => {
    // TODO: dataKey cannot be updated in Bar.js etc.
    // because it uses deep merge in groupId or stackId
    // object will also keep the removed key
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        <Bar
          dataKey={select(
            "steelblue data key: ",
            barKeyObject,
            "25 to 34 years old"
          )}
          fill={color("bar color 1: ", "steelblue")}
          groupId={"degree"}
        />
        <Bar
          dataKey={select(
            "purple data key: ",
            barKeyObject,
            "35 to 44 years old"
          )}
          fill={color("bar color 2: ", "purple")}
          groupId={"degree"}
        />
        <Marker
          value={
            barData.reduce(
              (total, data, index) =>
                (total +=
                  data[
                    select(
                      "steelblue data key: ",
                      barKeyObject,
                      "25 to 34 years old"
                    )
                  ]),
              0
            ) / barData.length
          }
          label={"平均值"}
          labelAnchor={select(
            "steelblue Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "middle"
          )}
          stroke={"steelblue"}
        />
        <Marker
          value={
            barData.reduce(
              (total, data, index) =>
                (total +=
                  data[
                    select(
                      "purple data key: ",
                      barKeyObject,
                      "35 to 44 years old"
                    )
                  ]),
              0
            ) / barData.length
          }
          label={"平均值"}
          labelAnchor={select(
            "purple Marker label anchor: ",
            {
              start: "start",
              middle: "middle",
              end: "end"
            },
            "end"
          )}
          stroke={"purple"}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 10000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("multi-bars with different scale", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Bar
          dataKey={"25 to 34 years old"}
          fill={color("linear scale color: ", "steelblue")}
          groupId={"multi-scale-bar"}
          yAxisId={"linear"}
        />
        <Bar
          dataKey={"class"}
          fill={color("linear scale color: ", "purple")}
          groupId={"multi-scale-bar"}
          yAxisId={"band"}
        />
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis
          dataKey={"25 to 34 years old"}
          scale={scaleLinear()}
          tickPadding={0.1}
          yAxisId={"linear"}
        />
        <YAxis
          dataKey={"class"}
          orientation={"right"}
          scale={scaleBand()}
          tickPadding={0.1}
          yAxisId={"band"}
        />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("grouped BarChart", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"成组柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            groupId={"group-bar"}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 10000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("stacked BarChart", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"堆叠柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            stackId={"stack-bar"}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 40000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("mixed grouped and stacked BarChart-1", () => {
    let dynamicProps = [
      { groupId: "mixed-group" },
      { stackId: "mixed-stack", groupId: "mixed-group" }
    ];
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            {...dynamicProps[i <= 2 ? 1 : 0]}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 26000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("mixed grouped and stacked BarChart-2", () => {
    let dynamicProps = [
      { stackId: "mixed-stack-1", groupId: "mixed-group" },
      { stackId: "mixed-stack-2", groupId: "mixed-group" },
      { groupId: "mixed-group" }
    ];
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            {...dynamicProps[i % 3]}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 16000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
      </ChartProvider>
    );
  })
  .add("grouped BarChart with Legend", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"成组柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            groupId={"group-bar"}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 10000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
        <Legend {...barLegnedSettings} />
      </ChartProvider>
    );
  })
  .add("stacked BarChart with Legend", () => {
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"堆叠柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            stackId={"stack-bar"}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 40000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
        <Legend {...barLegnedSettings} />
      </ChartProvider>
    );
  })
  .add("mixed grouped and stacked BarChart-1 with Legend", () => {
    let dynamicProps = [
      { groupId: "mixed-group" },
      { stackId: "mixed-stack", groupId: "mixed-group" }
    ];
    return (
      <ChartProvider
        width={number("chart width: ", 500, chartWidthOptions)}
        height={500}
        margin={margin}
        data={object("data: ", barData)}
        title={"柱形图"}
        clip={true}
      >
        <Grid
          grid={select(
            "grid type: ",
            {
              auto: "auto",
              row: "row",
              column: "column"
            },
            "column"
          )}
        />
        {Object.keys(barKeyObject).map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={color(
              "bar-" + (i + 1) + "'s color: ",
              ["steelblue", "purple", "red", "blue", "green"][i]
            )}
            {...dynamicProps[i <= 2 ? 1 : 0]}
          />
        ))}
        <XAxis
          dataKey={"Education"}
          scale={scaleBand()
            .round(true)
            .padding(0.1)}
          tickPadding={0.1}
        />
        <YAxis domain={[0, 26000]} scale={scaleLinear()} tickPadding={0.1} />
        <Zoom />
        <Brush top={380} />
        <Legend {...barLegnedSettings} />
      </ChartProvider>
    );
  });
