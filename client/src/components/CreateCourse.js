import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context';
import ValidationErrors from './ValidationErrors';

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

  // On submit, collects form data into course object and sends it to server via createCourse method from context. If successful, navigates to list of courses. If unsuccessful, renders validation errors.
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
        } else if (response.status === 500) {
          navigate('/error')
        }
      })
      .catch(error => {
        navigate('/error')
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
              <label htmlFor='courseTitle'>Course Title</label>
              <input htmlFor='courseTitle' name='courseTitle' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label htmlFor='courseDescription'>Course Description</label>
              <textarea id='courseDescription' name='courseDescription' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input htmlFor='estimatedTime' name='estimatedTime' type='text' value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>

              <label htmlFor='materialsNeeded'>Materials Needed</label>
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