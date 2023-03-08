import React, { useState, useEffect } from 'react';
import Dropdowns from './components/YearDropdown';
import YearDropdown from './components/YearDropdown';
import EventDropdown from './components/EventDropdown';
import SessionDropdown from './components/SessionDropdown';
import DriverDropdown from './components/DriverDropdown';
import './App.css';

function App() {

  const [events, setEvents] = useState([{}])
  const [drivers, setDrivers] = useState([{}])
  const [sessions, setSessions] = useState([{}])
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    fetch("/events")
      .then(res => {
        return res.json()
      })
      .then(events => {
        setEvents(events)
        setIsPending(false)
        console.log(events)
      }
    )
  }, [])
  

  useEffect(() => {
    fetch("/sessions")
      .then(res => {
        return res.json()
      })
      .then(sessions => {
        setSessions(sessions)
        console.log(sessions)
      }
    )
  }, [])


  useEffect(() => {
    fetch("/drivers")
      .then(res => {
        return res.json()
      })
      .then(drivers => {
        setDrivers(drivers)
        console.log(drivers)
      }
    )
  }, [])

  return (
    <div>
      <div id="dropdownMenu">
        <YearDropdown/>
        <EventDropdown events={events}/>
        <SessionDropdown sessions={sessions}/>
        <DriverDropdown drivers={drivers}/>
      </div>
    </div>
  );
}

export default App;