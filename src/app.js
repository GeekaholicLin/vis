import React, { Component } from "react";
import points from "./data/points.data";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, max } from "d3-array";
import { timeParse, timeFormat } from "d3-time-format";
import { tsv } from "d3-request";
import { LineChart, AreaChart } from "./charts";
import { PREFIX } from "./constant";
import salesData from "./data/sales.data";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaData: []
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
  }
  render() {
    let margin = { top: 20, right: 10, bottom: 20, left: 10 };
    let lineData = salesData.map(obj => ({
      price: obj.price,
      date: timeParse("%d.%m.%Y")(obj.date)
    }));
    let xScale = scaleTime().nice();
    let yScale = scaleLinear().nice();
    let { areaData } = this.state;
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
            y0={() => 0}
            y1={d => d.close}
            xScale={scaleTime().nice()}
            yScale={scaleLinear().nice()}
            xDomain={extent(areaData, d => d.date)}
            yDomain={[0, max(areaData, d => d.close)]}
            tickPadding={7}
          />
        </div>
      </div>
    );
  }
}
