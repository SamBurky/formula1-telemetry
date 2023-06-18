import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Curve,
} from "recharts";

class Minisectors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer height={450} id="minisectors-container">
        <LineChart data={this.props.telemetryData}>
          <Curve datakey="X1"></Curve>
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default Minisectors;
