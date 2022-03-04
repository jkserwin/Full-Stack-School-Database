import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';

class App extends Component {
  
  render() {
    
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Courses/>} />

          </Routes>
        </div>
      </Router>
    );

  }

  
}

export default App;