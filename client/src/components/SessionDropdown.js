import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

function SessionDropdown(props) {

    const sessionsList = props.sessions; 
    
    return (
        <DropdownButton id="session-dropdown" title="Select Session">
            
            {(typeof sessionsList.sessions === 'undefined') ? (
                <Dropdown.Item key="sessions-loading">Loading...</Dropdown.Item>
            ) : (
                sessionsList.sessions.map((session, i) => (
                <Dropdown.Item key={i}>{session}</Dropdown.Item>
                ))
            )}
  
        </DropdownButton>
    );
}

export default SessionDropdown;