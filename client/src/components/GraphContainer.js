import React, { Component } from "react";
import LapTimesGraph from "./LapTimesGraph";
import Dropdowns from "./Dropdowns";
import Minisectors from "./Minisectors";
import Telemetry from "./Telemetry";

class GraphContainer extends Component {
  constructor(props) {
    super(props);

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleDriver1Change = this.handleDriver1Change.bind(this);
    this.handleDriver2Change = this.handleDriver2Change.bind(this);
    this.handleLapDataChange = this.handleLapDataChange.bind(this);
    this.handleSelectLap = this.handleSelectLap.bind(this);

    this.state = {
      year: "",
      years: ["2023", "2022", "2021", "2020", "2019", "2018"],
      event: "",
      events: "",
      session: "",
      sessions: "",
      driver1: "",
      driver2: "",
      drivers: "",
      lapData: "",
      selectedLaps: "",
    };
  }

  handleYearChange(yearInput) {
    this.setState({
      year: yearInput,
      event: "",
      session: "",
      driver1: "",
      driver2: "",
    });
    fetch("/events/" + yearInput)
      .then((res) => {
        return res.json();
      })
      .then((eventsBack) => {
        console.log(eventsBack);
        this.setState({ events: eventsBack });
      });
  }

  handleEventChange(eventInput) {
    this.setState({
      event: eventInput,
      session: "",
      driver1: "",
      driver2: "",
    });
    fetch("/sessions/" + this.state.year + "/" + eventInput)
      .then((res) => {
        return res.json();
      })
      .then((sessionsBack) => {
        console.log(sessionsBack);
        this.setState({ sessions: sessionsBack });
      });
  }

  handleSessionChange(sessionInput) {
    this.setState({
      session: sessionInput,
      driver1: "",
      driver2: "",
    });
    fetch(
      "/drivers/" +
        this.state.year +
        "/" +
        this.state.event +
        "/" +
        sessionInput
    )
      .then((res) => {
        return res.json();
      })
      .then((driversBack) => {
        console.log(driversBack);
        this.setState({ drivers: driversBack });
      });
  }

  handleDriver1Change(driverInput) {
    this.setState({ driver1: driverInput });
  }

  handleDriver2Change(driverInput) {
    this.setState({ driver2: driverInput });
  }

  handleLapDataChange() {
    fetch(
      "/lapData/" +
        this.state.year +
        "/" +
        this.state.event +
        "/" +
        this.state.session +
        "/" +
        this.state.driver1 +
        "/" +
        this.state.driver2
    )
      .then((res) => {
        return res.json();
      })
      .then((lapDataBack) => {
        console.log(lapDataBack);
        this.setState({ lapData: lapDataBack });
      });
  }

  handleSelectLap(selectedLap) {
    this.setState({ selectedLaps: [...this.state.selectedLaps, selectedLap] });
  }

  render() {
    return (
      <div>
        <div className="flex-container">
          <Dropdowns
            // Handlers
            onYearChange={this.handleYearChange}
            onEventChange={this.handleEventChange}
            onSessionChange={this.handleSessionChange}
            onDriver1Change={this.handleDriver1Change}
            onDriver2Change={this.handleDriver2Change}
            onLapDataChange={this.handleLapDataChange}
            // State variables
            year={this.state.year}
            years={this.state.years}
            event={this.state.event}
            events={this.state.events}
            session={this.state.session}
            sessions={this.state.sessions}
            driver1={this.state.driver1}
            driver2={this.state.driver2}
            drivers={this.state.drivers}
          />
        </div>
        <div>
          <LapTimesGraph
            // Handlers
            onSelectLap={this.handleSelectLap}
            // Variables
            // year={this.state.year}
            // event={this.state.event}
            // session={this.state.session}
            driver1={this.state.driver1}
            driver2={this.state.driver2}
            lapData={this.state.lapData}
          />
        </div>
        <div>
          <Minisectors />
        </div>
        <div className="telemetry">
          <Telemetry />
        </div>
      </div>
    );
  }
}

export default GraphContainer;
