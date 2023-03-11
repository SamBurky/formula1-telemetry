import React, { useState, useEffect } from 'react';
import Dropdowns from './components/Dropdowns';
import './App.css';
import LapTimesGraph from './components/LapTimesGraph';

function App() {

  return (
    <div>
      <div>
        <Dropdowns />
      </div>
      <div>
        <LapTimesGraph />
      </div>
    </div>
  );
}

export default App;