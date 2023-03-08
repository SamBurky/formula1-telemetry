import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

function EventDropdown(props) {

  const eventsList = props.events;

  return (
      <DropdownButton id="event-dropdown" title="Select Event">
          
          {(typeof eventsList.events === 'undefined') ? (
              <Dropdown.Item key="year-loading">Loading...</Dropdown.Item>
          ) : (
              eventsList.events.map((event, i) => (
              <Dropdown.Item key={i}>{event}</Dropdown.Item>
              ))
          )}

      </DropdownButton>
  );
}

export default EventDropdown;