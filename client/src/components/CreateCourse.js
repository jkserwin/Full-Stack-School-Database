import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

import UnhandledError from './UnhandledError';

function CreateCourse() {

  const context = useContext(Context);

  const [ title, setTitle ] = useState();
  const [ description, setDescription ] = useState();
  const [ estimatedTime, setEstimatedTime ] = useState();
  const [ materialsNeeded, setMaterialsNeeded ] = useState();

  const authUser = context.authenticatedUser;
  const createCourse = context.actions.createCourse;

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  // add onSubmit={createCourse} to form tag
  return(
    <main>
      <div className='wrap'>
        <h2>Create Course</h2>
        <form onSubmit={createCourse}>
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