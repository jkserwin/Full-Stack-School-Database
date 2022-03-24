import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../Context';
import ValidationErrors from './ValidationErrors';

function UpdateCourse () {

  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  const navigate = useNavigate();
  const { id } = useParams();

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ errors, setErrors ] = useState([]);
  const [ isMounted, setIsMounted ] = useState(false);
  
  // Calls getCourse function from context; if a course is found, updates state with data; if no course is found, navigates to /notfound route
  useEffect(() => {
    const getCourse = async () => {
      await context.actions.getCourse(id)
        .then(response => {
          if (response.status === 200) {
            response.json().then(data => {
              setTitle(data.title);
              setDescription(data.description);
              (data.estimatedTime) ? 
                setEstimatedTime(data.estimatedTime) 
                : 
                setEstimatedTime('');
              (data.materialsNeeded) ? 
                setMaterialsNeeded(data.materialsNeeded) 
                : 
                setMaterialsNeeded('');
              setUserId(data.userId);
            })
          } if (response.status === 404) {
            navigate('/notfound')
          }
        })
        .catch(error => {
          navigate('/error')
        })
    }
    getCourse();
    setIsMounted(true);
  }, []);

  // Checks that currently authenticated user is associated with this course before rendering page; if not associated, navigates to /forbidden
  useEffect(() => {
    const checkUserAuth = () => {
      if (authUser) {
        if (authUser.id === userId) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (isMounted) {
      if (checkUserAuth()) {
        return;
      } else {
        navigate('/forbidden')
      }
    }
  }, [userId]);

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  // On submit, collects form data into updatedCourse object and sends it to server via updateCourse method from context; if successful, navigates to CourseDetail page for this course; if unsuccessful, renders validation errors.
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedCourse = {
      title: title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded
    };
    context.actions.updateCourse(id, updatedCourse, authUser.emailAddress, authUser.password)
      .then(response => {
        if (response.status === 204) {
          navigate(-1);
        } else if (response.status === 400) {
          response.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
      .catch(error => {
        navigate('/error')
      });
  }

  return(
    <main>
      <div className='wrap'>
        <h2>Update Course</h2>
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
          <button className='button' type='submit'>Update Course</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        
      </div>    
    </main>
  );
}

export default UpdateCourse;