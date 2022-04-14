/*
1.Rewrite the you created in Part-4 using promises adding the number of students registered in each course.
{
  crn: 200,
  courseCode: 'GENG 200',
  courseName: 'Probability and Statistics for Engineers',
  semester: 'Fall 2016',
  instructorId: 12,
  instructorName: 'Zeyad Ali',
  studentCount: 56
},
*/

import fs from "fs-extra";

function getCourses() {
  return fs.readJSON("data/course.json");
}

function setInstructorName(courses) {
  return fs.readJSON("data/staff.json").then(staff => {
    return courses.map(course => {
      const instructor = staff.find(staff => staff.staffNo === course.instructorId);
      return {
        ...course,
        instructorName: instructor.firstname + " " + instructor.lastname,
      };
    });
  });
}

function setStudentCount(courses) {
  return fs.readJSON("data/student.json").then(students => {
    return courses.map(course => {
      return {
        ...course,
        studentCount: students.reduce(
          (count, student) => count + (student.courseIds.indexOf(course.crn) !== -1 ? 1 : 0), 0
        )
      };
    });
  });
}

// get the courses with corresponding instructor name and student count
// getCourses()
//   .then(result => {
//     // do whatever you want with the result
//     setInstructorNames(result)
//       .then(result => {
//         setStudentCount(result)
//           .then(result => console.log(result))
//           .catch(error => console.error(error))
//       })
//       .catch(error => console.error(error))
//   })
//   .catch(error => console.error(error));

// chaining promises
getCourses()
  .then(result => setInstructorNames(result))
  .then(result => setStudentCount(result))
  .then(result => console.log(result))
  .catch(error => console.error(error));

// setStudentCount(setInstructorNames(getCourses()))

// p1.then(result => {
//   p2.then(result => {
//     p3.then(result => {
//
//     }).catch()
//   }).catch()
// }).catch()

// p1.then(result => {
//     return p2;
//   })
//   .then(result => {
//     return p3;
//   })
//   .then(result => {
//     return result;
//   })
//   .catch(error => {})
