/*
1.	In project9.js :  Rewrite the code you created in project7.js but this time switch to using the node-fetch library.
File locations:
data/course.json
data/student.json
data/course.json
data/staff.json
data/ceng-programs.json
*/

import fs from "fs-extra";
import fetch from "node-fetch";

// async function getCourses() {
//   try {
//     // const courses = await fs.readJSON("data/course.json");
//     const response = await fetch("http://localhost:3000/data/course.json");
//     const courses = await response.json();
//
//     return courses;
//   } catch (error) {
//     throw error;
//   }
// }
//
// async function setInstructorNames(courses) {
//   try {
//     const response = await fetch("http://localhost:3000/data/staff.json");
//     const staff = await response.json();
//
//     for (const course of courses) {
//       const instructor = staff.find(staff => staff.staffNo === course.instructorId);
//       course.instructorName = instructor.firstname + " " + instructor.lastname;
//     }
//     return courses;
//   } catch (error) {
//     throw error;
//   }
// }
//
// async function setStudentCount(courses) {
//   try {
//     const response = await fetch("http://localhost:3000/data/students.json");
//     const students = await response.json();
//
//     courses = courses.map(course => {
//       const studentCount = students.reduce((count, student) =>
//         count + (student.courseIds.indexOf(course.crn) !== -1 ? 1 : 0),
//         0);
//       return {
//         ...course,
//         studentCount,
//       };
//     });
//     return courses;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchProcess(path, before, process) {
//   try {
//     const response = await fetch(path);
//     const data = await response.json();
//
//     const after = process(data, before);
//     return after;
//   } catch (error) {
//     throw error;
//   }
// }

async function getCourses() {
  const response = await fetch("http://localhost:3000/data/course.json");
  return await response.json();
}

async function setInstructorName(courses) {
  const response = await fetch("http://localhost:3000/data/staff.json");
  const staff = await response.json();

  for (const c of courses) {
    const instructor = staff.find(staff => staff.staffNo === course.instructorId);
    course.instructorName = instructor.firstname + " " + instructor.lastname;
  }
  return courses;
}

async function setStudentCount(courses) {
  const response = await fetch("http://localhost:3000/data/student.json");
  const students = await response.json();

  return courses.map(course => {
    return {
      ...course,
      studentCount: students.reduce(
        (count, student) => count + (student.courseIds.indexOf(course.crn) !== -1 ? 1 : 0), 0
      )
    };
  });
}

// get the courses with corresponding instructor name and student count
try {
  let courses = await getCourses();
  courses = await setInstructorNames(courses);
  courses = await setStudentCount(courses);
  console.log(courses);
} catch (error) {
  console.error(error);
}
