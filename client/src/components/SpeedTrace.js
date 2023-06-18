import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@mui/material";

class SpeedTrace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // function t1points() {
    //   return this.props.telemetryData1.map(({ value, ...item }) => item);
    // }

    let t1points = "";
    let t2points = "";

    if (this.props.telemetryData1 != "") {
      t1points = this.props.telemetryData1.map(function (obj) {
        return {
          x: obj.x,
          y: obj.y,
        };
      });
    }

    if (this.props.telemetryData2 != "") {
      t2points = this.props.telemetryData2.map(function (obj) {
        return {
          x: obj.x,
          y: obj.y,
        };
      });
    }

    return (
      <div id="telemetry-graph">
        <ResponsiveContainer height={450} id="speed-trace-container">
          <ScatterChart id="speed-trace">
            <Scatter
              data={t1points}
              fill="#00000000"
              line={{ stroke: "#8884d8" }}
            />
            <Scatter
              data={t2points}
              fill="#00000000"
              line={{ stroke: "#FF0000" }}
            />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, "datamax"]}
              interval="preserveStart"
              unit=" m"
              ticks={[
                0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
              ]}
              allowDecimals={false}
            />
            <YAxis dataKey="y" type="number" unit=" km/h" />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} layout="horizontal" />
            <CartesianGrid stroke="#ccc" />
          </ScatterChart>
        </ResponsiveContainer>
        <Button variant="outlined" onClick={this.props.onSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default SpeedTrace;
