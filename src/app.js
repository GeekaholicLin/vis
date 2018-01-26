import React, { Component } from "react";
import { Broadcast, Subscriber } from "react-broadcast";
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
import { Text, Gradient, Group, SVG } from "components";
import {
  ChartProvider,
  Pie,
  Legend,
  Area,
  XAxis,
  YAxis,
  Zoom,
  Brush,
  Curve,
  Grid,
  Bar,
  Marker
} from "HOC";
import { PatternLines } from "@vx/pattern";
import { PREFIX } from "constant";
import salesData from "data/sales.data";
import { getRandomGradientColor } from "ultis";
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
    let pieData = [
      { name: "1", value: 20, selected: true },
      { name: "2", value: 10 },
      { name: "3", value: 30 },
      { name: "4", value: 10 },
      { name: "5", value: 20 },
      { name: "6", value: 5 }
    ];
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
        <div id="line-chart2">
          <ChartProvider
            className="vis-app-line-chart2"
            margin={{ top: 50, right: 50, bottom: 110, left: 50 }}
            data={lineData}
            title={"折线图"}
            clip={true}
          >
            <Grid grid="row" />
            <Curve stroke={"steelblue"} dataKey={"price"} />
            <Zoom />
            <Brush top={380} />
            <XAxis
              label={"年月"}
              tickPadding={10}
              dataKey={"date"}
              tickFormat={timeFormat("%x")}
              scale={scaleTime().nice()}
            />
            <YAxis
              label={
                <Text
                  top={-10}
                  left={0}
                  textAnchor={"middle"}
                  verticalAnchor={"end"}
                >
                  成绩自定义标签
                </Text>
              }
              domain={[80, 150]}
              tickPadding={10}
              scale={scaleLinear().nice()}
            />
            <Marker value={110} label={"平均值"} labelAnchor="start" />
            <Marker
              type="x"
              label={"最小年月"}
              labelAnchor="middle"
              value={new Date("2/1/2016")}
            />
            <Marker
              type="x"
              label={"最大年月"}
              labelAnchor="middle"
              value={new Date("2/1/2017")}
            />
          </ChartProvider>
        </div>

        <div id="area-chart2">
          <ChartProvider
            className="vis-app-pie-chart2"
            margin={{ top: 30, right: 50, bottom: 110, left: 50 }}
            data={areaData}
            title={CustomTitle}
            clip={true}
          >
            <Gradient id="area-chart" colors={getRandomGradientColor()} />
            <XAxis dataKey={"date"} scale={scaleTime()} />
            <YAxis dataKey={"close"} scale={scaleLinear().nice()} />
            <Area dataKey={"close"} stroke={"none"} fill={`url(#area-chart)`} />
            <Curve stroke={"steelblue"} dataKey={d => d.close} />
            <Zoom />
            <Brush />
          </ChartProvider>
        </div>

        <div id="stacked-area-chart2">
          <ChartProvider
            className="vis-app-chart2"
            margin={{ top: 30, right: 50, bottom: 110, left: 50 }}
            data={stackAreaData}
            clip={true}
          >
            <Gradient id="stackarea-chart1" colors={["#5EFCE8", "#736EFE"]} />
            <Gradient id="stackarea-chart2" colors={["#FDD819", "#E80505"]} />
            <Gradient id="stackarea-chart3" colors={["#FFFE9F", "#FCA180"]} />
            <Gradient id="stackarea-chart4" colors={["#FFF3B0", "#CA26FF"]} />
            <Gradient id="stackarea-chart5" colors={["#ABDCFF", "#0396FF"]} />
            <Gradient id="stackarea-chart6" colors={["#5EFCE8", "#736EFE"]} />
            <Gradient id="stackarea-chart7" colors={["#FDD819", "#E80505"]} />
            <Gradient id="stackarea-chart8" colors={["#FFFE9F", "#FCA180"]} />
            <XAxis dataKey={"date"} scale={scaleTime()} />
            <YAxis
              scale={scaleLinear().nice()}
              domain={[0, 1]}
              ticks={[10, "%"]}
            />
            {stackAreaKeys.map((keyName, i) => {
              return (
                <Area
                  dataKey={keyName}
                  key={keyName}
                  stroke={"none"}
                  fill={`url(#stackarea-chart${i + 1})`}
                  stackId={"browser"}
                />
              );
            })}
            <Zoom />
            <Brush />
          </ChartProvider>
        </div>

        <div id="bar-chart2">
          <ChartProvider
            className="vis-app-bar-chart2"
            margin={{ top: 30, right: 50, bottom: 110, left: 50 }}
            data={barData}
            clip={true}
          >
            <PatternLines
              id="lines"
              height={5}
              width={5}
              stroke={"steelblue"}
              strokeWidth={1}
              orientation={["diagonal"]}
            />
            <Grid />
            <XAxis
              dataKey={"letter"}
              scale={scaleBand()
                .round(true)
                .align(1)
                .padding(0.1)}
              tickPadding={0.1}
              domain={barData.map(d => d.letter)}
            />
            <YAxis
              dataKey={"frequency"}
              scale={scaleLinear()}
              tickPadding={0.1}
            />
            <Bar dataKey={"frequency"} fill={"url(#lines)"} />
            <Zoom />
            <Brush />
          </ChartProvider>
        </div>

        <div id="stacked-bar-chart2">
          <ChartProvider
            className="group-bar-chart3"
            margin={{ top: 30, right: 50, bottom: 110, left: 50 }}
            data={stackBarData}
            clip={true}
          >
            <PatternLines
              id="lines1"
              height={5}
              width={5}
              stroke={"black"}
              strokeWidth={1}
              orientation={["diagonal"]}
            />
            <PatternLines
              id="lines2"
              height={5}
              width={5}
              stroke={"red"}
              strokeWidth={1}
              orientation={["diagonal"]}
            />
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
            />
            <PatternLines
              id="lines5"
              height={5}
              width={5}
              stroke={"green"}
              strokeWidth={1}
              orientation={["diagonal"]}
            />
            <PatternLines
              id="lines6"
              height={5}
              width={5}
              stroke={"grey"}
              strokeWidth={1}
              orientation={["diagonal"]}
            />
            <PatternLines
              id="lines7"
              height={5}
              width={5}
              stroke={"pink"}
              strokeWidth={1}
              orientation={["diagonal"]}
            />
            <Grid />
            <XAxis
              dataKey={"State"}
              scale={scaleBand()
                .round(true)
                .padding(0.1)
                .align(0.1)}
              tickPadding={0.1}
            />
            <YAxis
              domain={[0, 1]}
              scale={scaleLinear().nice()}
              tickPadding={0.1}
            />
            {stackBarKeys &&
              stackBarKeys.map((keyName, index) => {
                return (
                  <Bar
                    key={keyName}
                    dataKey={keyName}
                    fill={`url(#lines${index + 1})`}
                    stackId={"percent"}
                    stackOffset={"expand"}
                  />
                );
              })}
            <Zoom />
            <Brush />
          </ChartProvider>
        </div>

        <div id="pie-chart2">
          <ChartProvider
            className="vis-app-pie-chart2"
            width={960}
            height={500}
            data={[
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]}
            dataKey={d => d.value}
            nameKey={"name"}
            fill={schemeCategory20}
          >
            <Pie className="pie-chart" innerRadius={50} outerRadius={150} />
            <Legend title="饼图图例" />
          </ChartProvider>
        </div>
        <div id="group-bar-chart2">
          <ChartProvider
            className="group-bar-chart"
            margin={{ top: 30, right: 50, bottom: 110, left: 50 }}
            data={groupBarData}
            clip={true}
          >
            <Grid />
            <XAxis
              dataKey={"Education"}
              scale={scaleBand()
                .round(true)
                .paddingInner(0.1)}
              tickPadding={0.1}
            />
            <YAxis
              domain={[
                0,
                max(groupBarData, d => max(groupBarKeys, key => d[key]))
              ]}
              scale={scaleLinear().nice()}
              tickPadding={0.1}
            />
            {groupBarKeys.map((childCateKey, index) => {
              let colors = ["red", "pink", "black", "steelblue", "yellow"];
              let groups = groupBarData.map(d => d.Education);
              return (
                <Bar
                  key={childCateKey}
                  dataKey={childCateKey}
                  fill={colors[index]}
                  groupId={"degree"}
                />
              );
            })}
            <Zoom />
            <Brush />
          </ChartProvider>
        </div>
      </div>
    );
  }
}
