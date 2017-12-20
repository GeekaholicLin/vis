import React, { Component } from "react";
import points from "./data/points.data";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, max } from "d3-array";
import { timeParse, timeFormat } from "d3-time-format";
import { SVG, Curve, Axis } from "./components/index";
import { LineChart } from "./charts";
import { PREFIX } from "./constant";
import salesData from "./data/sales.data";
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mockData = salesData.map(obj => ({
      price: obj.price,
      date: timeParse("%d.%m.%Y")(obj.date)
    }));
    let xScale = scaleTime()
      .domain(extent(mockData, d => d.date))
      .range([40, 960 - 80])
      .nice();
    let yScale = scaleLinear()
      .domain([0, max(mockData, d => d.price)])
      .range([500 - 80, 40])
      .nice();
    let x = d => d.date;
    let y = d => d.price;

    return (
      <LineChart className="vis-app-linechart">
        <Curve
          className={"vis-app-curve"}
          x={x}
          y={y}
          xScale={xScale}
          yScale={yScale}
          data={mockData}
          fill="none"
          stroke="blue"
          strokeWidth={2}
        />
        <Axis
          className={"vis-app-xAxis"}
          scale={xScale}
          tickFormat={timeFormat("%x")}
          tickPadding={7}
          tickSizeInner={-(500 - 120)}
          transform={"translate(0,420)"}
        />
        <Axis
          className={"vis-app-yAxis"}
          orientation={"left"}
          scale={yScale}
          tickPadding={7}
          tickSizeInner={-(960 - 120)}
          transform={"translate(40,0)"}
        />
      </LineChart>
    );
  }
}
