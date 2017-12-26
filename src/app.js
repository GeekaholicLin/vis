import React, { Component } from "react";
import points from "./data/points.data";
import {
  scaleLinear,
  scaleTime,
  scaleBand,
  scaleOrdinal,
  schemeCategory10,
  schemeCategory20
} from "d3-scale";
import { stackOffsetExpand } from "d3-shape";
import { extent, max } from "d3-array";
import { timeParse, timeFormat } from "d3-time-format";
import { tsv, csv } from "d3-request";
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
  StackAreaChart,
  StackBarChart,
  GroupBarChart
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
      stackBarData: [],
      groupBarData: [],
      stackAreaKeys: [],
      stackBarkeys: [],
      groupBarKeys: []
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
          stackAreaKeys: data[0] ? data[0].columns.slice(1) : []
        });
      }
    );
    csv(
      "./data/stack-bar.data.csv",
      (d, i, columns) => {
        for (let i = 1, t = 0; i < columns.length; ++i) {
          t += d[columns[i]] = +d[columns[i]];
          d.total = t;
        }
        d.columns = columns;
        return d;
      },
      (error, data) => {
        if (error) throw error;
        data.sort(function(a, b) {
          return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total;
        });
        this.setState({
          stackBarData: [...data],
          stackBarKeys: data[0] ? data[0].columns.slice(1) : []
        });
      }
    );
    csv(
      "./data/group-bar.data.csv",
      (d, i, columns) => {
        for (let i = 1, t = 0; i < columns.length; ++i) {
          d[columns[i]] = +d[columns[i]];
        }
        d.columns = columns;
        return d;
      },
      (error, data) => {
        if (error) throw error;
        this.setState({
          groupBarData: [...data],
          groupBarKeys: data.columns ? data.columns.slice(1) : []
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
    let {
      areaData,
      barData,
      stackAreaData,
      stackAreaKeys,
      stackBarData,
      stackBarKeys,
      groupBarData,
      groupBarKeys
    } = this.state;
    return (
      <div>
        <div id="line-chart">
          <LineChart
            className="vis-app-line-chart"
            data={lineData}
            x={d => d.date}
            y={d => d.price}
            xScale={scaleTime().nice()}
            yScale={scaleLinear().nice()}
            xTickPadding={7}
            yTickPadding={7}
            xTickFormat={timeFormat("%x")}
            grid={"none"}
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
            keys={stackAreaKeys}
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
        <div id="stacked-bar-chart">
          <StackBarChart
            className="stacked-bar-chart"
            margin={{ left: 50, top: 50, right: 50, bottom: 50 }}
            width={960}
            height={500}
            data={stackBarData}
            x={d => d.data.State}
            y={d => d[1]}
            xScale={scaleBand()
              .round(true)
              .padding(0.1)
              .align(0.1)}
            yScale={scaleLinear().nice()}
            xDomain={stackBarData.map(d => d.State)}
            yDomain={[0, 1]}
            tickPadding={0.1}
            keys={stackBarKeys}
            offset={"expand"}
            color={scaleOrdinal().range([
              "#98abc5",
              "#8a89a6",
              "#7b6888",
              "#6b486b",
              "#a05d56",
              "#d0743c",
              "#ff8c00"
            ])}
          />
        </div>

        <div id="pie-chart">
          <PieChart
            className="vis-app-pie-chart"
            data={pieData}
            width={500}
            height={500}
            innerRadius={50}
            outerRadius={150}
            color={scaleOrdinal(schemeCategory20)}
          />
        </div>

        <div id="group-bar-chart">
          <GroupBarChart
            className="grouped-bar-chart"
            margin={{ left: 50, top: 50, right: 50, bottom: 50 }}
            width={960}
            height={500}
            data={groupBarData}
            x0={d => d.Education}
            x1={d => d.key}
            y={d => d.value}
            x0Scale={scaleBand()
              .round(true)
              .paddingInner(0.1)}
            x1Scale={scaleBand().padding(0.05)}
            yScale={scaleLinear().nice()}
            x0Domain={groupBarData.map(d => d.Education)}
            x1Domain={groupBarKeys}
            yDomain={[
              0,
              max(groupBarData, d => max(groupBarKeys, key => d[key]))
            ]}
            color={scaleOrdinal(schemeCategory10)}
            yRange={[450, 0]}
          />
        </div>
      </div>
    );
  }
}
