import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

import UnhandledError from './UnhandledError';

function Courses() {

  const [ courses, setCourses ] = useState([]);
  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      await context.actions.getCourses()
        .then(response => {
          if (response.status === 200) {
            response.json().then(data => setCourses(data))
          } else if (response.status === 404) {
            navigate('/notfound')
          }
        })
        .catch(error => {
          navigate('/error')
        })
    }
    getCourses();
  }, [context.actions, navigate]);

  let courseLinks;
  if (courses.length > 0) {
    courseLinks = courses.map(course => 
        <Link className='course--module course--link' to={`/courses/${course.id}`} key={course.id}>
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
        <Link className='course--module course--add--module' to='/courses/create'>
          <span className='course--add--title'>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
}

export default Courses;