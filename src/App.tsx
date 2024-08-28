import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../src/index.css';
import AnalysisPage from './components/AnalysisPage';
import DefaultLayout from './components/layouts/DefaultLayout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<AnalysisPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;