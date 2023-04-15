import React, { Component } from "react";

class Container extends Component {
  constructor(props) {
    super(props);

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleDriver1Change = this.handleDriver1Change.bind(this);
    this.handleDriver2Change = this.handleDriver2Change.bind(this);

    this.state = {
      year: "Select Year",
      years: ["2023", "2022", "2021", "2020", "2019", "2018"],
      event: "Select Event",
      events: "",
      session: "Select Session",
      sessions: "",
      driver1: "Select Driver 1",
      driver2: "Select Driver 2",
      drivers: "",
      lapData: "",
    };
  }

  handleYearChange(yearInput) {
    this.setState({
      year: yearInput,
      event: "Select Event",
      session: "Select Session",
      driver1: "Select Driver 1",
      driver2: "Select Driver 2",
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
      session: "Select Session",
      driver1: "Select Driver 1",
      driver2: "Select Driver 2",
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
      driver1: "Select Driver 1",
      driver2: "Select Driver 2",
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

  render() {
    return <div></div>;
  }
}

export default Container;
