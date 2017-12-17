import React, { Component } from "react";
import { Svg, Curve } from "./components/index";
import points from "./data/points.data";
import { scaleLinear } from "d3-scale";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Svg width={500} height={500}>
        <Curve
          data={points}
          color={"red"}
          className={"test"}
          xScale={scaleLinear()
            .domain([0, 400])
            .range([0, 500])}
          yScale={scaleLinear()
            .domain([0, 400])
            .range([0, 500])}
        />
      </Svg>
    );
  }
}
