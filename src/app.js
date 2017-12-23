import React, { Component } from "react";
import points from "./data/points.data";
import {
  scaleLinear,
  scaleTime,
  scaleBand,
  scaleOrdinal,
  schemeCategory20
} from "d3-scale";
import { extent, max } from "d3-array";
import { timeParse, timeFormat } from "d3-time-format";
import { tsv } from "d3-request";
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
  StackAreaChart
} from "./charts";
import { PREFIX } from "./constant";
import salesData from "./data/sales.data";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaData: [],
      barData: [],
      stackAreaData: [],
      keys: []
    };
  }

  componentWillMount() {
    tsv(
      "./data/price.data.csv",
      d => {
        d.date = timeParse("%d-%b-%y")(d.date);
        d.close = +d.close;
        return d;
      },
      (error, data) => {
        if (error) throw error;
        this.setState({
          areaData: [...data]
        });
      }
    );
    tsv(
      "./data/letter.data.tsv",
      d => {
        d.frequency = +d.frequency;
        return d;
      },
      (error, data) => {
        if (error) throw error;
        this.setState({
          barData: [...data]
        });
      }
    );
    tsv(
      "./data/stacked-area.data.tsv",
      (d, i, columns) => {
        d.date = timeParse("%Y %b %d")(d.date);
        for (var i = 1, n = columns.length; i < n; ++i)
          d[columns[i]] = d[columns[i]] / 100;
        d.columns = columns;
        return d;
      },
      (error, data) => {
        if (error) throw error;
        this.setState({
          stackAreaData: [...data],
          keys: data[0] ? data[0].columns.slice(1) : []
        });
      }
    );
  }
  render() {
    let margin = { top: 20, right: 10, bottom: 20, left: 10 };
    let lineData = salesData.map(obj => ({
      price: obj.price,
      date: timeParse("%d.%m.%Y")(obj.date)
    }));
    let pieData = [1, 1, 2, 3, 5, 8, 13, 21];
    let xScale = scaleTime().nice();
    let yScale = scaleLinear().nice();
    let { areaData, barData, stackAreaData, keys } = this.state;
    return (
      <div>
        <div id="line-chart">
          <LineChart
            className="vis-app-line-chart"
            width={960}
            height={500}
            data={lineData}
            x={d => d.date}
            y={d => d.price}
            xScale={xScale}
            yScale={yScale}
            xDomain={extent(lineData, d => d.date)}
            yDomain={[0, max(lineData, d => d.price)]}
            tickPadding={7}
            xTickFormat={timeFormat("%x")}
          />
        </div>
        <div id="area-chart">
          <AreaChart
            className="vis-app-area-chart"
            width={960}
            height={500}
            data={areaData}
            x={d => d.date}
            y={d => d.close}
            y0={d => 0}
            y1={d => d.close}
            xScale={scaleTime().nice()}
            yScale={scaleLinear().nice()}
            xDomain={extent(areaData, d => d.date)}
            yDomain={[0, max(areaData, d => d.close)]}
            tickPadding={7}
          />
        </div>
        <div id="stacked-area-chart">
          <StackAreaChart
            className="vis-app-area-chart"
            width={960}
            height={500}
            margin={{ left: 50, top: 50, right: 50, bottom: 50 }}
            data={stackAreaData}
            x={d => d.data.date}
            y0={d => d[0]}
            y1={d => d[1]}
            xScale={scaleTime().nice()}
            yScale={scaleLinear().nice()}
            xDomain={extent(stackAreaData, d => d.date)}
            yDomain={[0, 1]}
            keys={keys}
            color={scaleOrdinal(schemeCategory20)}
          />
        </div>
        <div id="bar-chart">
          <BarChart
            className="vis-app-area-chart"
            width={960}
            height={500}
            data={barData}
            x={d => d.letter}
            y={d => d.frequency}
            xScale={scaleBand()
              .round(true)
              .padding(0.1)}
            yScale={scaleLinear().nice()}
            xDomain={barData.map(d => d.letter)}
            yDomain={[0, max(barData, d => d.frequency)]}
            tickPadding={0.1}
          />
        </div>
        <div id="pie-chart">
          <PieChart
            className="vis-app-pie-chart"
            data={pieData}
            width={500}
            height={500}
            innerRadius={0}
            outerRadius={150}
            color={scaleOrdinal(schemeCategory20)}
          />
        </div>
      </div>
    );
  }
}
