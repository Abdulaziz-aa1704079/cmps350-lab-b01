/* 1.	In project7.js :  Rewrite the code you created in project5.js using Async/await.
 */

import fs from "fs-extra";

// async function getCourses() {
//   try {
//     const courses = await fs.readJSON("data/course.json");
//     return courses;
//   } catch (error) {
//     throw error;
//   }
// }
//
// async function setInstructorNames(courses) {
//   try {
//     const staff = await fs.readJSON("data/staff.json");
//     courses = courses.map(course => {
//       const instructor = staff.find(staff => staff.staffNo === course.instructorId);
//       return {
//         ...course,
//         instructorName: instructor.firstname + " " + instructor.lastname,
//       };
//     });
//     return courses;
//   } catch (error) {
//     throw error;
//   }
// }
//
// async function setStudentCount(courses) {
//   try {
//     const students = await fs.readJSON("data/student.json");
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

async function getCourses() {
  return await fs.readJSON("data/course.json");
}

async function setInstructorName(courses) {
  const staff = await fs.readJSON("data/staff.json");

  for (const c of courses) {
    const instructor = staff.find(staff => staff.staffNo === course.instructorId);
    course.instructorName = instructor.firstname + " " + instructor.lastname;
  }
  return courses;
}

async function setStudentCount(courses) {
  const students = await fs.readJSON("data/student.json");

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
