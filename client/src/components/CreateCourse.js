import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UnhandledError from './UnhandledError';

class CreateCourse extends Component {

  constructor() {
    super();
    this.state ={
      course: [],
    };
  }

  // componentDidMount() {
  //   this.getCourseDetail(req.params.id);
  // }

  getCourseDetail = (id) => {
    fetch(`http://localhost:5000/api/courses${id}`)
      .then(res => res.json())
      .then(res => this.setState({course: res}))
      .catch(err => {console.log('Error fetching and parsing data', err)});
  }

  render() {
    const course = this.state.course;
    let materialsList;
    if (course.materials.length > 0) {
      materialsList = course.materials.map(item => 
          <li>{item}</li>
        );
    } else {
      materialsList = `<li>No materials listed</li>`;
    }

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
            <button className='button button-secondary' onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
          </form>
          
        </div>    
      </main>
    );
  }

}

export default CreateCourse;