import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignUp';

class App extends Component {
  
  render() {
    
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Courses/>} />
            <Route path="/courses/create" element={<CreateCourse/>} />
            <Route path="/courses/:id/update" element={<UpdateCourse/>} />
            <Route path="/courses/:id" element={<CourseDetail/>} />
            <Route path="/signin" element={<UserSignIn/>} />
            <Route path="/signup" element={<UserSignUp/>} />
            <Route path="/signout" element={<UserSignOut/>} />
            <Route element={NotFound} />
          </Routes>
        </div>
      </Router>
    );

  }

  
}

export default App;