/*
1.Rewrite the you created in Part-2 using promises.
*/

import fs from "fs-extra";

// function readFile(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, function(err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// }

function getCourses() {
  // return readFile("data/course.json");

//   return new Promise((resolve, reject) => {
//     fs.readFile("data/course.json", function(err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         const courses = JSON.parse(data);
//         // console.log(courses);
//         resolve(courses);
//
//         // console.log(setInstructorNames(courses));
//
//         // doesn't work. promise has to be settled
//         // return setInstructorNames(courses);
//
//         // setInstructorNames(courses)
//         //   .then(result => resolve(result))
//         //   .catch(error => reject(error));
//       }
//     });
//   });

  return fs.readJSON("data/course.json");
}

function setInstructorNames(courses) {
//   return new Promise((resolve, reject) => {
//     fs.readFile("data/staff.json", function(err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         const staff = JSON.parse(data);
//         // console.log(staff);
//
//         for (const course of courses) {
//           const instructor = staff.find(staff => staff.staffNo === course.instructorId);
//           course.instructorName = instructor.firstname + " " + instructor.lastname;
//         }
//
//         // courses = courses.map(course => {
//         // 	const instructor = staff.find(staff => staff.staffNo === course.instructorId);
//         // 	return {
//         // 		...course,
//         // 		instructorName: instructor.firstname + " " + instructor.lastname,
//         // 	};
//         // });
//
//         // callback(error, data) -> (resolve(data), reject(error))
//         resolve(courses);
//       }
//     });
//   });

  return fs.readJSON("data/staff.json").then(staff => {
    for (const c of courses) {
      const s = staff.find(s => s.staffNo === c.instructorId);
      c.instructorName = s.firstname + " " + s.lastname;
    }
    return courses;
  });
}

// get the courses with corresponding instructor name
getCourses()
  .then(result => {
    // do whatever you want with the result
    setInstructorNames(result)
      .then(result => console.log(result))
      .catch(error => console.error(error))
  })
  .catch(error => console.error(error));

// deeply nested calls with separate error handling blocks
// getCourses()
//   .then(result => {
//     // do whatever you want with the result
//     setInstructorNames(result)
//       .then(result => {
//         console.log(result);
//         p1
//           .then(result => {
//             p2
//               .then(result => {
//
//               })
//               .catch(error => console.error(error))
//           })
//           .catch(error => console.error(error))
//       })
//       .catch(error => console.error(error))
//   })
//   .catch(error => console.error(error));
