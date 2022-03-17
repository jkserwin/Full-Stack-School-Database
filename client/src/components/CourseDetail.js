import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Context } from '../Context';

import UnhandledError from './UnhandledError';

function CourseDetail() {

  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  const [ course, setCourse ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => {console.log('Error fetching and parsing data', err)});
  }, [id]);

  const deleteCourse = async () => {
    await context.actions.deleteCourse(id, authUser.emailAddress, authUser.password);
    <Navigate to='/'/>
  }

  const byline = course.User ? 
    `${course.User.firstName} ${course.User.lastName}` 
    : 
    'unknown';

  return(
    <main>
      <div className='actions--bar'>
        <div className='wrap'>
          <Link className='button' to={`/courses/${course.id}/update`}>Update Course</Link>
          <Link className='button' to='/' onClick={deleteCourse}>Delete Course</Link>
          <Link className='button button-secondary' to='/'>Return to List</Link>
        </div>
      </div>

      <div className='wrap'>
        <h2>Course Detail</h2>
        <form>
          <div className='main--flex'>
            <div>
              <h3 className='course--detail--title'>Course</h3>
              <h4 className='course--name'>{course.title}</h4>
              <p>By {byline}</p>
              <p>{course.description}</p>
            </div>
            <div>
              <h3 className='course--detail--title'>Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className='course--detail--title'>Materials Needed</h3>
              <ul className='course--detail--list'>
                {course.materials}
              </ul>
            </div>
          </div>

        </form>
      </div>    
    </main>
  );

}

export default CourseDetail;