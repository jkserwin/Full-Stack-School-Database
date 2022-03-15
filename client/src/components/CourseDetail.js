import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import UnhandledError from './UnhandledError';

function CourseDetail() {

  const [ course, setCourse ] = useState('');
  const [ user, setUser ] = useState('')
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => {console.log('Error fetching and parsing data', err)});
  }, [id]);

  const deleteCourse = () => {
    fetch(`http://localhost:5000/api/courses/${id}`, {method: 'DELETE'})
      .then(res => {console.log('Course deleted')})
      .catch(err => {console.log('Error deleting course:', err)})
  };

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
              <p>By {course.firstName} {course.lastName}</p>
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