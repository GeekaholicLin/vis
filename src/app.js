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
import { PatternLines } from "@vx/pattern";
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
    let CustomTitle = (
      <svg width="140" height="30" x="430" y="10">
        <a
          style={{ cursor: "pointer" }}
          href="https://developer.mozilla.org/en-US/docs/SVG"
          target="_blank"
        >
          <rect height="30" width="120" y="0" x="0" rx="15" />
          <text fill="white" textAnchor="middle" y="21" x="60">
            面积图
          </text>
        </a>
      </svg>
    );
    return (
      <div>
        <div id="line-chart">
          <LineChart
            className="vis-app-line-chart"
            margin={{ top: 50, right: 50, bottom: 30, left: 50 }}
            data={lineData}
            x={d => d.date}
            y={d => d.price}
            xScale={scaleTime()}
            yScale={scaleLinear().nice()}
            xTickFormat={timeFormat("%x")}
            grid={"auto"}
            xTickPadding={10}
            yTickPadding={10}
            title={"折线图"}
            zoom={true}
          />
        </div>
        <div id="area-chart">
          <AreaChart
            margin={{ top: 50, right: 50, bottom: 30, left: 50 }}
            className="vis-app-area-chart"
            data={areaData}
            x={d => d.date}
            y={d => d.close}
            xScale={scaleTime().nice()}
            yScale={scaleLinear().nice()}
            title={CustomTitle}
            fill={
              <PatternLines
                id="lines"
                height={5}
                width={5}
                stroke={"black"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />
            }
          />
        </div>
        <div id="stacked-area-chart">
          <StackAreaChart
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
            yTicks={[10, "%"]}
            fill={[
              <PatternLines
                id="lines1"
                height={5}
                width={5}
                stroke={"black"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines2"
                height={5}
                width={5}
                stroke={"red"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />
            ]}
          />
        </div>
        <div id="bar-chart">
          <BarChart
            className="vis-app-area-chart"
            data={barData}
            x={d => d.letter}
            y={d => d.frequency}
            xScale={scaleBand()
              .round(true)
              .padding(0.1)}
            yScale={scaleLinear()}
            xDomain={barData.map(d => d.letter)}
            xTickPadding={0.1}
            yTickPadding={0.1}
            fill={
              <PatternLines
                id="lines"
                height={5}
                width={5}
                stroke={"black"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />
            }
          />
        </div>
        <div id="stacked-bar-chart">
          <StackBarChart
            className="stacked-bar-chart"
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
            xTickPadding={0.1}
            tTickPadding={0.1}
            keys={stackBarKeys}
            offset={"expand"}
            fill={[
              <PatternLines
                id="lines1"
                height={5}
                width={5}
                stroke={"black"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines2"
                height={5}
                width={5}
                stroke={"red"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines3"
                height={5}
                width={5}
                stroke={"blue"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines4"
                height={5}
                width={5}
                stroke={"yellow"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines5"
                height={5}
                width={5}
                stroke={"green"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines6"
                height={5}
                width={5}
                stroke={"grey"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines7"
                height={5}
                width={5}
                stroke={"pink"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />
            ]}
          />
        </div>

        <div id="pie-chart">
          <PieChart
            className="vis-app-pie-chart"
            data={pieData}
            width={960}
            height={500}
            innerRadius={50}
            outerRadius={150}
            fill={[
              <PatternLines
                id="lines1"
                height={5}
                width={5}
                stroke={"black"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines2"
                height={5}
                width={5}
                stroke={"red"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />
            ]}
          />
        </div>

        <div id="group-bar-chart">
          <GroupBarChart
            className="grouped-bar-chart"
            data={groupBarData}
            x={d => d.Education}
            xScale={scaleBand()
              .round(true)
              .paddingInner(0.1)}
            yScale={scaleLinear().nice()}
            xDomain={groupBarData.map(d => d.Education)}
            keys={groupBarKeys}
            yDomain={[
              0,
              max(groupBarData, d => max(groupBarKeys, key => d[key]))
            ]}
            fill={[
              <PatternLines
                id="lines1"
                height={5}
                width={5}
                stroke={"black"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />,
              <PatternLines
                id="lines2"
                height={5}
                width={5}
                stroke={"red"}
                strokeWidth={1}
                orientation={["diagonal"]}
              />
            ]}
          />
        </div>
      </div>
    );
  }
}
