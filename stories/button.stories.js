import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { schemeCategory20 } from "d3-scale";
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
} from "../src/HOC";
storiesOf("Button", module).addWithDoc(
  "with label",
  ChartProvider,
  "It should render a button with a label",
  () => (
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
  )
);
