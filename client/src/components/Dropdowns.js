import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

class Dropdowns extends React.Component {
  constructor(props) {
    super(props);

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleDriverChange = this.handleDriverChange.bind(this);

    this.state = {
      year: 'Select Year',
      event: 'Select Event',
      events: '',
      session: 'Select Session',
      sessions: '',
      driver: 'SelectDriver',
      drivers: '',
    };

  }

  handleYearChange(yearInput) {
    this.setState({year: yearInput})
    fetch("/events/" + yearInput)
    .then(res => {
      return res.json()
    })
    .then(eventsBack => {
      console.log(eventsBack);
      this.setState({  events: eventsBack });
    }
    )
  }

  handleEventChange(eventInput) {
    this.setState({event: eventInput});
    fetch("/sessions")
    .then(res => {
      return res.json()
    })
    .then(sessionsBack => {
      console.log(sessionsBack);
      this.setState({ sessions: sessionsBack});
    }
    )
  }

  handleSessionChange(sessionInput) {
    this.setState({session: sessionInput});
    fetch("/drivers")
    .then(res => {
      return res.json()
    })
    .then(driversBack => {
      console.log(driversBack);
      this.setState({ drivers: driversBack});
    }
    )
  }

  handleDriverChange(driverInput) {
    this.setState({driver: driverInput});
  }

  render() {
    const year = this.state.year;
    return (
      <div>
        <YearDropdown2 year={this.state.year} onYearChange={this.handleYearChange}/>
        <EventDropdown2 event={this.state.event} events={this.state.events} onEventChange={this.handleEventChange} />
        <SessionDropdown2 session={this.state.session} sessions={this.state.sessions} onSessionChange={this.handleSessionChange} />
        <DriverDropdown2 driver={this.state.driver} drivers={this.state.drivers} onDriverChange={this.handleDriverChange}/>
      </div>
    );


  }
}

class YearDropdown2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.props.onYearChange(e);
  }

  render () {
    const year = this.props.year;

    return(
      <DropdownButton id="year-dropdown" title={year} onSelect={this.handleSelect}>
        <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
        <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
        <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
        <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
        <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
        <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
      </DropdownButton>
    );
  }
};

class EventDropdown2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
    this.props.onEventChange(e);
  }

  render () {
    const eventName = this.props.event; 
    const eventsList = this.props.events;

    return (
      <DropdownButton id="event-dropdown" title={eventName} onSelect={this.handleSelect}>
        <div style={{ height: "210px", overflowY: "scroll" }}>
          {(typeof eventsList.events === 'undefined') ? (
            <Dropdown.Item key="year-loading">Loading...</Dropdown.Item>
          ) : (
            eventsList.events.map((event, i) => (
              <Dropdown.Item key={i} eventKey={event}>{event}</Dropdown.Item>
            ))
          )}
        </div>
      </DropdownButton>
    );
  }

};

class SessionDropdown2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
    this.props.onSessionChange(e);
  }

  render () {
    const sessionName = this.props.session;
    const sessionsList = this.props.sessions; 
    
      return (
          <DropdownButton id="session-dropdown" title={sessionName} onSelect={this.handleSelect}>
              {(typeof sessionsList.sessions === 'undefined') ? (
                  <Dropdown.Item key="sessions-loading">Loading...</Dropdown.Item>
              ) : (
                  sessionsList.sessions.map((session, i) => (
                  <Dropdown.Item key={i} eventKey={session}>{session}</Dropdown.Item>
                  ))
              )}
  
          </DropdownButton>
      );

  }
}


class DriverDropdown2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
    this.props.onDriverChange(e);
  }

  render() {
    const driverName = this.props.driver
    const driverList = this.props.drivers;
  
    return (
        <DropdownButton id="driver-dropdown" title={driverName} onSelect={this.handleSelect}>
            <div style={{height:"210px", overflowY:"scroll"}}>
                {(typeof driverList.drivers === 'undefined') ? (
                    <Dropdown.Item key="drivers-loading">Loading...</Dropdown.Item>
                ) : (
                    driverList.drivers.map((driver, i) => (
                    <Dropdown.Item key={i} eventKey={driver}>{driver}</Dropdown.Item>
                    ))
                )}
            </div>
        </DropdownButton>
    );

  }
}

export default Dropdowns;