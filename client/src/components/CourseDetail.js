import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../Context';

function CourseDetail() {

  const context = useContext(Context);
  const navigate = useNavigate();
  const authUser = context.authenticatedUser;
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ assocUser, setAssocUser ] = useState('');
  const { id } = useParams();

  // Calls getCourse function from context; if a course is found, updates state with data; if no course is found, navigates to /notfound route
  useEffect(() => {
    const getCourse = async () => {
      await context.actions.getCourse(id)
        .then(response => {
          if (response.status === 200) {
            response.json().then(data => {
              setAssocUser(data.User);
              setTitle(data.title);
              setDescription(data.description);
              (data.estimatedTime) 
                ? setEstimatedTime(data.estimatedTime) 
                : setEstimatedTime('')
              ;
              (data.materialsNeeded) 
                ? setMaterialsNeeded(data.materialsNeeded) 
                : setMaterialsNeeded('')
              ;
              setUserId(data.userId);
            })
          } else if (response.status === 404) {
            navigate('/notfound');
          } else if (response.status === 500) {
            navigate('/error')
          }
        })
        .catch(error => {
          navigate('/error')
        });
    }
    getCourse()
  }, [id]);

  // Places DELETE request to server and navigates to main page
  const deleteCourse = async () => {
    await context.actions.deleteCourse(id, authUser.emailAddress, authUser.password);
    navigate('/');
  }

  // Checks if current user is associated with this course
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

  // Displays Update and Delete Course buttons if current user is associated with this course
  let buttons;
  if (checkUserAuth()) {
    buttons = 
      <div className='wrap'>
        <Link className='button' to={`/courses/${id}/update`}>Update Course</Link>
        <Link className='button' to='/' onClick={deleteCourse}>Delete Course</Link>
        <Link className='button button-secondary' to='/'>Return to List</Link>
      </div>
  } else {
    buttons = 
      <div className='wrap'>
        <Link className='button button-secondary' to='/'>Return to List</Link>
      </div>
  }

  return(
    <main>
      <div className='actions--bar'>
        {buttons}
      </div>

      <div className='wrap'>
        <h2>Course Detail</h2>
        <form>
          <div className='main--flex'>
            <div>
              <h3 className='course--detail--title'>Course</h3>
              <h4 className='course--name'>{title}</h4>
              <p>By {assocUser.firstName} {assocUser.lastName}</p>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
            <div>
              <h3 className='course--detail--title'>Estimated Time</h3>
              <p>{estimatedTime}</p>
              <h3 className='course--detail--title'>Materials Needed</h3>
              <ul className='course--detail--list'>
                <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>

        </form>
      </div>    
    </main>
  );

}

export default CourseDetail;