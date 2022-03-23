import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

import UnhandledError from './UnhandledError';

function UpdateCourse () {

  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  const navigate = useNavigate();
  const { id } = useParams();

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');

  useEffect(() => {
    const getCourse = async () => {
      await context.actions.getCourse(id)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setDescription(data.description);
          if (data.estimatedTime) {
            setEstimatedTime(data.estimatedTime);
          } else {
            setEstimatedTime('');
          };
          if (data.materialsNeeded) {
            setMaterialsNeeded(data.materialsNeeded);
          } else {
            setMaterialsNeeded('');
          };
        })
        .catch(error => {
          navigate('/notfound')
        })
    }
    getCourse()
  }, [id]);

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedCourse = {
      title: title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded
    };
    context.actions.updateCourse(id, updatedCourse, authUser.emailAddress, authUser.password);
    navigate(-1);
  }

  return(
    <main>
      <div className='wrap'>
        <h2>Update Course</h2>
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
          <button className='button' type='submit'>Update Course</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        
      </div>    
    </main>
  );
}

export default UpdateCourse;