import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UnhandledError from './UnhandledError';

class CourseDetail extends Component {

  constructor() {
    super();
    this.state ={
      course: [],
    };
  }

  componentDidMount() {
    this.getCourseDetail(this.props.params.id);
  }

  getCourseDetail = (id) => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(res => this.setState({course: res}))
      .catch(err => {console.log('Error fetching and parsing data', err)});
  }

  render() {
    const course = this.state.course;
    // let materialsList;
    // if (course.materials.length > 0) {
    //   materialsList = course.materials.map(item => 
    //       <li>{item}</li>
    //     );
    // } else {
    //   materialsList = `<li>No materials listed</li>`;
    // }

    return(
      <main>
        <div className='actions--bar'>
          <div className='wrap'>
            <Link className='button' to=''>Update Course</Link>
            <Link className='button' to=''>Delete Course</Link>
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

}

export default CourseDetail;