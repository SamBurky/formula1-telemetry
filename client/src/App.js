import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import GraphContainer from "./components/GraphContainer.js";

function App() {
  return (
    <div>
      {/* <div>
        <Dropdowns />
      </div>
      <div>
        <LapTimesGraph />
      </div> */}
      <div>
        <GraphContainer />
      </div>
    </div>
  );
}

export default App;
