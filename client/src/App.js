import React, { useState, useEffect } from 'react';
import Dropdowns from './components/Dropdowns';
import './App.css';
import LapTimesGraph from './components/LapTimesGraph';
import ExampleChart from './components/ExampleChart';

function App() {

  return (
    <div>
      <div>
        <Dropdowns />
      </div>
      <div>
        <LapTimesGraph />
      </div>
      {/* <div>
        <ExampleChart />
      </div> */}
    </div>
  );
}

export default App;