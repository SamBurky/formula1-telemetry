import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

class Telemetry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer width="70%" height={450} id="telemetry-graph">
        <LineChart id="speed-trace" data={this.props.lapData}>
          <Line
            name={this.props.driver1}
            type="monotone"
            dataKey="LapTime1"
            stroke="#8884d8"
            // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
            activeDot={{
              onClick: (event, payload) => {
                console.log(payload);
                this.props.onSelectLap(payload.index);
              },
            }}
          />
          <Line
            name={this.props.driver2}
            type="monotone"
            dataKey="LapTime2"
            stroke="#FF0000"
            // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
            activeDot={{
              onClick: (event, payload) => {
                console.log(payload);
                this.props.onSelectLap(payload.index);
              },
            }}
          />
          <XAxis interval={4} />
          <YAxis
            dataKey="LapTime1"
            type="number"
            domain={["dataMin - 1000", "dataMax + 1000"]}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} layout="horizontal" />
          <CartesianGrid stroke="#ccc" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default Telemetry;
