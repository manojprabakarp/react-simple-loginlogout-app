import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainComponent from './components/main_component.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <MainComponent />
        </Router>
      </header>
    </div>
  );
}

export default App;
