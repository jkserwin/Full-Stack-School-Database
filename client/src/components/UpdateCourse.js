import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

import UnhandledError from './UnhandledError';

function UpdateCourse () {

  const context = useContext(Context);
  const { id } = useParams();

  const [ course, setCourse ] = useState('');

  const [ title, setTitle ] = useState(course.title);
  const [ description, setDescription ] = useState(course.description);
  const [ estimatedTime, setEstimatedTime ] = useState(course.estimatedTime);
  const [ materialsNeeded, setMaterialsNeeded ] = useState(course.materialsNeeded);

  const authUser = context.authenticatedUser;

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses${id}`)
    .then(res => res.json())
    .then(res => this.setState({course: res}))
    .catch(err => {console.log('Error fetching and parsing data', err)});
  }, [id]);

  return(
    <main>
      <div className='wrap'>
        <h2>Update Course</h2>
        <form>
          <div className='main--flex'>
            <div>
              <label for='courseTitle'>Course Title</label>
              <input for='courseTitle' name='courseTitle' type='text' value={course.title} onChange={(e) => setTitle(e.target.value)}/>

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label for='courseDescription'>Course Description</label>
              <textarea id='courseDescription' name='courseDescription' onChange={(e) => setDescription(e.target.value)}>{course.description}</textarea>
            </div>
            <div>
              <label for='estimatedTime'>Estimated Time</label>
              <input for='estimatedTime' name='estimatedTime' type='text' value={course.estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>

              <label for='materialsNeeded'>Materials Needed</label>
              <textarea id='materialsNeeded' name='materialsNeeded' onChange={(e) => setMaterialsNeeded(e.target.value)}>{course.materialsNeeded}</textarea>
            </div>
          </div>
          <button className='button' type='submit'>Update Course</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        
      </div>    
    </main>
  );
}

export default UpdateCourse;