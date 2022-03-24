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
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import PrivateRoute from './PrivateRoute';

import { Provider } from './Context';

class App extends Component {
  
  render() {
    
    return (
      <Router>
        <div className="App">
          <Provider>
            <Header />
            <Routes>
              <Route path="/" element={<Courses/>} />
              <Route path="/courses" element={<Courses/>} />
              <Route path="/courses/create" element={<PrivateRoute/>}>
                <Route path='' element={<CreateCourse/>}/>
              </Route>
              <Route path="/courses/:id/update" element={<PrivateRoute/>}>
                <Route path='' element={<UpdateCourse/>}/>
              </Route>
              <Route path="/courses/:id" element={<CourseDetail/>} />
              <Route path="/signin" element={<UserSignIn/>} />
              <Route path="/signup" element={<UserSignUp/>} />
              <Route path="/signout" element={<UserSignOut/>} />
              <Route path="/notfound" element={<NotFound/>} />
              <Route path="/forbidden" element={<Forbidden/>} />
              <Route path="/error" element={<UnhandledError/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Provider>
        </div>
      </Router>
    );

  }

  
}

export default App;