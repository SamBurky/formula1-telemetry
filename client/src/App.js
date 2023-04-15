import React, { useState, useEffect } from "react";
import Dropdowns from "./components/Dropdowns";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import LapTimesGraph from "./components/LapTimesGraph";

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
