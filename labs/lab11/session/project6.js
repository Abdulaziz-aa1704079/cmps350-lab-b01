/*
1.In project6.js :  Rewrite the code you created in project4.js using Async/await.
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
//     for (const course of courses) {
//       const instructor = staff.find(staff => staff.staffNo === course.instructorId);
//       course.instructorName = instructor.firstname + " " + instructor.lastname;
//     }
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

// get the courses with corresponding instructor name
try {
  let courses = await getCourses();
  courses = await setInstructorNames(courses);
  console.log(courses);
} catch (error) {
  console.error(error);
}
