 import { Routes, Route, Link } from "react-router-dom"
import CornerstoneOld from "./components/LoadingImages";
import Homepage from "./components/WebHomepage";
 import '../src/index.css'

import React from "react";


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/LoadingImages" element={<CornerstoneOld />}></Route>
        </Routes>
    </div>
  );
}

export default App;
