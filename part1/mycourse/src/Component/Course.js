import React from "react";

const Header = ({ courses }) => {
  return (
    <div>
      <h1 className="display-2">Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <p>
              {course.parts.map((part) => (
                <Part key={part.id} part={part} />
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p className="text-info">
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ courses }) => {
  const totalExercises = courses.reduce(
    (total, course) => total + course.parts.reduce((total, part) => total + part.exercises, 0), 0
  )
  console.log(totalExercises);

  return (
    <div>
      <Header courses={courses} />
      <p className="text-drake">Total of {totalExercises} exercises</p>
    </div>
  );
};

export default Course;
