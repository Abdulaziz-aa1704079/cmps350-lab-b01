/*
1.Rewrite the you created in Part-1 using promises.
*/

import fs from "fs-extra";

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// readFile("data/student.json")
//   .then(result => console.log(result))
//   .catch(error => console.error(error));

// const p1 = new Promise((resolve, reject) => {
//   if (Math.random() >= 0.5) {
//     resolve(1);
//   } else {
//     reject(0);
//   }
// });
//
// p1
//   .then(result => console.log("Resolve:", result))
//   .catch(error => console.error("Reject:", error));

/******************************************************************************/

// fs.readJSON("data/student.json")
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

function getStudents() {
  return fs.readJSON("data/student.json");
}

getStudents()
  .then(students => console.log(students))
  .catch(error => console.error(error));
