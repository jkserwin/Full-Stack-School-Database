import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context';
import ValidationErrors from './ValidationErrors';

import UnhandledError from './UnhandledError';

function CreateCourse() {

  const context = useContext(Context);
  const navigate = useNavigate();

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');
  const [ errors, setErrors ] = useState([])

  const authUser = context.authenticatedUser;
  const createCourse = context.actions.createCourse;

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      userId: authUser.id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };
    createCourse(course, authUser.emailAddress, authUser.password)
      .then(response => {
        if (response.status === 201) {
          navigate('/')
        } else if (response.status === 400) {
          response.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
      .catch(error => {
        navigate('/')
      });
  }

  return(
    <main>
      <div className='wrap'>
        <h2>Create Course</h2>
        {
          (errors.length > 0) 
          ? (<ValidationErrors errors={errors}/>)
          : null
        }
        <form onSubmit={handleSubmit}>
          <div className='main--flex'>
            <div>
              <label for='courseTitle'>Course Title</label>
              <input for='courseTitle' name='courseTitle' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label for='courseDescription'>Course Description</label>
              <textarea id='courseDescription' name='courseDescription' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label for='estimatedTime'>Estimated Time</label>
              <input for='estimatedTime' name='estimatedTime' type='text' value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>

              <label for='materialsNeeded'>Materials Needed</label>
              <textarea id='materialsNeeded' name='materialsNeeded' value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
            </div>
          </div>
          <button className='button' type='submit'>Create Course</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        
      </div>    
    </main>
  );
}

export default CreateCourse;