import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

import UnhandledError from './UnhandledError';

function CreateCourse() {

  const context = useContext(Context);
  
  const [ newCourse, setNewCourse ] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  });

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  // add onSubmit={createCourse} to form tag
  return(
    <main>
      <div className='wrap'>
        <h2>Create Course</h2>
        <form>
          <div className='main--flex'>
            <div>
              <label for='courseTitle'>Course Title</label>
              <input for='courseTitle' name='courseTitle' type='text' value='' />

              <p>By Joe Smith</p>

              <label for='courseDescription'>Course Description</label>
              <textarea id='courseDescription' name='courseDescription'></textarea>
            </div>
            <div>
              <label for='estimatedTime'>Estimated Time</label>
              <input for='estimatedTime' name='estimatedTime' type='text' value='' />

              <label for='materialsNeeded'>Materials Needed</label>
              <textarea id='materialsNeeded' name='materialsNeeded'></textarea>
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