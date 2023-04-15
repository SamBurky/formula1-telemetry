import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
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

class LapTimesGraph extends React.Component {
  constructor(props) {
    super(props);

    this.handleLapDataChange = this.handleLapDataChange.bind(this);
  }

  state = {
    lapData: "",
  };

  handleLapDataChange() {
    fetch("/lapData")
      .then((res) => {
        return res.json();
      })
      .then((lapDataBack) => {
        console.log(lapDataBack);
        this.setState({ lapData: lapDataBack });
      });
  }

  render() {
    return (
      <div id="lap-times-graph">
        <LineChart width={900} height={450} data={this.state.lapData}>
          <XAxis interval={4} />
          <YAxis
            dataKey="LapTime1"
            type="number"
            domain={["dataMin - 1000", "dataMax + 1000"]}
          />
          <Line type="monotone" dataKey="LapTime1" stroke="#8884d8" />
          <Line type="monotone" dataKey="LapTime2" stroke="#FF0000" />
          <CartesianGrid stroke="#ccc" />
        </LineChart>
        Lap Times Graph
        <Button id="submit-button" onClick={this.handleLapDataChange}>
          Submit?
        </Button>
      </div>
    );
  }
}

export default LapTimesGraph;
