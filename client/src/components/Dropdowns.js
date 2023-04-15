import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import LapTimesGraph from "./LapTimesGraph";

class Dropdowns extends React.Component {
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
    const year = this.state.year;
    return (
      <div id="dropdownMenu">
        <YearDropdown
          year={this.state.year}
          years={this.state.years}
          onYearChange={this.handleYearChange}
        />
        <EventDropdown
          event={this.state.event}
          events={this.state.events}
          onEventChange={this.handleEventChange}
        />
        <SessionDropdown
          session={this.state.session}
          sessions={this.state.sessions}
          onSessionChange={this.handleSessionChange}
        />
        <DriverDropdown
          driver={this.state.driver1}
          drivers={this.state.drivers}
          onDriverChange={this.handleDriver1Change}
        />
        <DriverDropdown
          driver={this.state.driver2}
          drivers={this.state.drivers}
          onDriverChange={this.handleDriver2Change}
        />
      </div>
    );
  }
}

class YearDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.props.onYearChange(event.target.value);
  }

  render() {
    const yearTitle = this.props.year;
    const yearsList = this.props.years;

    return (
      <FormControl fullWidth>
        <InputLabel id="year-dropdown-label">Year</InputLabel>
        <Select
          labelId="year-dropdown-label"
          id="year-select"
          value={yearTitle}
          label="Year"
          onChange={this.handleSelect}
        >
          {yearsList.map((year, i) => (
            <MenuItem value={year} key={i}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      // <DropdownButton id="year-dropdown" title={yearTitle} onSelect={this.handleSelect}>
      //   {yearsList.map((year, i) => (
      //         <Dropdown.Item key={i} eventKey={year}>{year}</Dropdown.Item>
      //       ))
      //   }
      // </DropdownButton>
    );
  }
}

class EventDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.props.onEventChange(event.target.value);
  }

  render() {
    const eventName = this.props.event;
    const eventsList = this.props.events;

    return (
      <FormControl fullWidth>
        <InputLabel id="event-dropdown-label">Event</InputLabel>
        <Select
          labelId="event-dropdown-label"
          id="event-select"
          value={eventName}
          label="event"
          onChange={this.handleSelect}
        >
          {typeof eventsList.events === "undefined" ? (
            <MenuItem key="year-loading">Loading...</MenuItem>
          ) : (
            eventsList.events.map((event, i) => (
              <MenuItem value={event} key={i}>
                {event}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      // <DropdownButton
      //   id="event-dropdown"
      //   title={eventName}
      //   onSelect={this.handleSelect}
      // >
      //   <div style={{ height: "210px", overflowY: "scroll" }}>
      //     {typeof eventsList.events === "undefined" ? (
      //       <Dropdown.Item key="year-loading">Loading...</Dropdown.Item>
      //     ) : (
      //       eventsList.events.map((event, i) => (
      //         <Dropdown.Item key={i} eventKey={event}>
      //           {event}
      //         </Dropdown.Item>
      //       ))
      //     )}
      //   </div>
      // </DropdownButton>
    );
  }
}

class SessionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.props.onSessionChange(event.target.value);
  }

  render() {
    const sessionName = this.props.session;
    const sessionsList = this.props.sessions;

    return (
      <FormControl fullWidth>
        <InputLabel id="session-dropdown-label">Session</InputLabel>
        <Select
          labelId="session-dropdown-label"
          id="session-select"
          value={sessionName}
          label="session"
          onChange={this.handleSelect}
        >
          {typeof sessionsList.sessions === "undefined" ? (
            <MenuItem key="event-loading">Loading...</MenuItem>
          ) : (
            sessionsList.sessions.map((session, i) => (
              <MenuItem value={session} key={i}>
                {session}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      // <DropdownButton
      //   id="session-dropdown"
      //   title={sessionName}
      //   onSelect={this.handleSelect}
      // >
      //   {typeof sessionsList.sessions === "undefined" ? (
      //     <Dropdown.Item key="sessions-loading">Loading...</Dropdown.Item>
      //   ) : (
      //     sessionsList.sessions.map((session, i) => (
      //       <Dropdown.Item key={i} eventKey={session}>
      //         {session}
      //       </Dropdown.Item>
      //     ))
      //   )}
      // </DropdownButton>
    );
  }
}

class DriverDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.props.onDriverChange(event.target.value);
  }

  render() {
    const driverName = this.props.driver;
    const driversList = this.props.drivers;

    return (
      <FormControl fullWidth>
        <InputLabel id="driver-dropdown-label">Driver</InputLabel>
        <Select
          labelId="driver-dropdown-label"
          id="driver-select"
          value={driverName}
          label="driver"
          onChange={this.handleSelect}
        >
          {typeof driversList.drivers === "undefined" ? (
            <MenuItem key="event-loading">Loading...</MenuItem>
          ) : (
            driversList.drivers.map((driver, i) => (
              <MenuItem value={driver} key={i}>
                {driver}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      // <DropdownButton
      //   id="driver-dropdown"
      //   title={driverName}
      //   onSelect={this.handleSelect}
      // >
      //   <div style={{ height: "210px", overflowY: "scroll" }}>
      //     {typeof driverList.drivers === "undefined" ? (
      //       <Dropdown.Item key="drivers-loading">Loading...</Dropdown.Item>
      //     ) : (
      //       driverList.drivers.map((driver, i) => (
      //         <Dropdown.Item key={i} eventKey={driver}>
      //           {driver}
      //         </Dropdown.Item>
      //       ))
      //     )}
      //   </div>
      // </DropdownButton>
    );
  }
}

export default Dropdowns;
