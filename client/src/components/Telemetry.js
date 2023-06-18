import React, { Component } from "react";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@mui/material";

class Telemetry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let t1_speed_points = "";
    let t2_speed_points = "";

    if (this.props.telemetryData1 != "") {
      t1_speed_points = this.props.telemetryData1.map(function (obj) {
        return {
          x: obj.x,
          y: obj.y,
        };
      });
    }

    if (this.props.telemetryData2 != "") {
      t2_speed_points = this.props.telemetryData2.map(function (obj) {
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
              data={t1_speed_points}
              fill="#00000000"
              line={{ stroke: "#8884d8" }}
            />
            <Scatter
              data={t2_speed_points}
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

        <ResponsiveContainer height={450} id="throttle-trace-container">
          <LineChart id="throttle-trace" data={this.props.telemetryData}>
            <Line
              name="ThrottleTrace - Ver"
              type="monotone"
              dataKey="Throttle"
              stroke="#8884d8"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload.value);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            <Line
              // name={this.props.driver2}
              type="monotone"
              dataKey="Throttle2"
              stroke="#FF0000"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            {/* <XAxis datakey="Distance" type="number" />
            <YAxis
              interval={20}
              // dataKey="Speed"
              // type="number"
              // domain={["dataMin - 1000", "dataMax + 1000"]}
            /> */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} layout="horizontal" />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={450} id="brake-trace-container">
          <LineChart id="brake-trace" data={this.props.telemetryData}>
            <Line
              name="BrakeTrace - Ver"
              type="monotone"
              dataKey="Brake"
              stroke="#8884d8"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload.value);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            <Line
              // name={this.props.driver2}
              type="monotone"
              dataKey="Brake2"
              stroke="#FF0000"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            {/* <XAxis datakey="Distance" type="number" />
            <YAxis
              interval={20}
              // dataKey="Speed"
              // type="number"
              // domain={["dataMin - 1000", "dataMax + 1000"]}
            /> */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} layout="horizontal" />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={450} id="gear-trace-container">
          <LineChart id="gear-trace" data={this.props.telemetryData}>
            <Line
              name="GearNoTrace - Ver"
              type="monotone"
              dataKey="nGear"
              stroke="#8884d8"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload.value);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            <Line
              // name={this.props.driver2}
              type="monotone"
              dataKey="nGear2"
              stroke="#FF0000"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            {/* <XAxis datakey="Distance" type="number" />
            <YAxis
              interval={20}
              // dataKey="Speed"
              // type="number"
              // domain={["dataMin - 1000", "dataMax + 1000"]}
            /> */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} layout="horizontal" />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={450} id="rpm-trace-container">
          <LineChart id="rpm-trace" data={this.props.telemetryData}>
            <Line
              name="RPMTrace - Ver"
              type="monotone"
              dataKey="RPM"
              stroke="#8884d8"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload.value);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            <Line
              // name={this.props.driver2}
              type="monotone"
              dataKey="RPM2"
              stroke="#FF0000"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            {/* <XAxis datakey="Distance" type="number" />
            <YAxis
              interval={20}
              // dataKey="Speed"
              // type="number"
              // domain={["dataMin - 1000", "dataMax + 1000"]}
            /> */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} layout="horizontal" />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={450} id="drs-trace-container">
          <LineChart id="drs-trace" data={this.props.telemetryData}>
            <Line
              name="DRSTrace - Ver"
              type="monotone"
              dataKey="DRS"
              stroke="#8884d8"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload.value);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            <Line
              // name={this.props.driver2}
              type="monotone"
              dataKey="DRS2"
              stroke="#FF0000"
              dot={false}
              // // TODO: RETURNING INDEX INSTEAD OF LAP NUMBER
              // activeDot={{
              //   onClick: (event, payload) => {
              //     console.log(payload);
              //     this.props.onSelectLap(payload.index);
              //   },
              // }}
            />
            {/* <XAxis datakey="Distance" type="number" />
            <YAxis
              interval={20}
              // dataKey="Speed"
              // type="number"
              // domain={["dataMin - 1000", "dataMax + 1000"]}
            /> */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} layout="horizontal" />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
        <Button variant="outlined" onClick={this.props.onSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default Telemetry;
