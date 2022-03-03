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

  constructor() {
    super();
    this.state ={
      courses: [],
    };

  }

  componentDidMount() {
    this.getCourses();
  }

  getCourses = () => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(res => this.setState(courses))
      .catch(err => {console.log('Error fetching and parsing data', err)});
  }
  
  render() {
    
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" component={Courses} />

          </Routes>
        </div>
      </Router>
    );

  }

  
}

export default App;