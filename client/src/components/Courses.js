import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UnhandledError from './UnhandledError';

class Courses extends Component {

  render() {

    const courses = this.props.courses;
    let courseLinks;
    if (courses.length > 0) {
      courseLinks = courses.map(course => 
          <Link className='course--module course--link' to='/'>
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        );
    } else {
      courseLinks = <UnhandledError />
    }

    return(
      <main>
        <div className='wrap main--grid'>
          {courseLinks}
          <Link className='course--module course--add--module' to='/create-course'>
            <span className='course--add--title'>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
              New Course
            </span>
          </Link>
        </div>
          </main>
      );
  }

}

export default Courses;