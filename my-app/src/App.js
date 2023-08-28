import React, { useState } from 'react';
import './App.css';

const gradePoints = {
  'A': 4,
  'B': 3,
  'C': 2,
  'D': 1,
  'F': 0,
};

const App = () => {
  const [courses, setCourses] = useState([{ creditHours: '', grade: 'A' }]);

  const addCourse = () => {
    setCourses([...courses, { creditHours: '', grade: 'A' }]);
  };

  const handleCreditHoursChange = (index, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index].creditHours = value;
    setCourses(updatedCourses);
  };

  const handleGradeChange = (index, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = value;
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    let totalCreditHours = 0;
    let totalGradePoints = 0;

    courses.forEach(course => {
      if (!isNaN(course.creditHours) && course.creditHours !== '') {
        totalCreditHours += parseFloat(course.creditHours);
        totalGradePoints += parseFloat(course.creditHours) * gradePoints[course.grade];
      }
    });

    return totalGradePoints / totalCreditHours;
  };

  return (
    <div className="container">
      <h1 className="title">University of Oklahoma GPA Calculator</h1>
      {courses.map((course, index) => (
        <div key={index} className="course">
          <div className="input-group">
            <label>Credit Hours:</label>
            <input
              type="number"
              value={course.creditHours}
              onChange={(e) => handleCreditHoursChange(index, e.target.value)}
              min="0"
            />
          </div>
          <div className="input-group">
            <label>Grade:</label>
            <select
              value={course.grade}
              onChange={(e) => handleGradeChange(index, e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
        </div>
      ))}
      <button className="add-button" onClick={addCourse}>Add Course</button>
      <div>
        {courses.length > 0 && <h2 className="gpa">Your GPA: {calculateGPA().toFixed(4)}</h2>}
      </div>
    </div>
  );
};

export default App;
