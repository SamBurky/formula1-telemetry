import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

function DriverDropdown(props) {

    const driverList = props.drivers;

    return (
        <DropdownButton id="driver-dropdown" title="Select Driver">
            
            {(typeof driverList.drivers === 'undefined') ? (
                <Dropdown.Item key="drivers-loading">Loading...</Dropdown.Item>
            ) : (
                driverList.drivers.map((driver, i) => (
                <Dropdown.Item key={i}>{driver}</Dropdown.Item>
                ))
            )}

        </DropdownButton>
    );
}

export default DriverDropdown;