import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

function YearDropdown() {
  return (
      <DropdownButton id="year-dropdown" title="Select Year">
        <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
        <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
        <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
        <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
        <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
        <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
      </DropdownButton>
  );
}

export default YearDropdown;