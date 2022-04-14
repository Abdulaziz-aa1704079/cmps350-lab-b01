/*
1.Convert this code to asynchronous form using a separate callback function (callBack).
2.Change the callback function to an anonymous one.
2.Take care of error handling in the callback function
*/

import fs from "fs";

//Synchronous code. Change it to async using callback.
// let data = fs.readFileSync("data/student.json");
//
// console.log(JSON.parse(data));

// function callback(err, data) {
//   if (err) {
//     console.error(err);
//   } else {
//     const json = JSON.parse(data);
//     console.log(json.length);
//
//     // another callback, maybe?
//   }
// }
//
// fs.readFile("data/student.json", callback);
//
// setTimeout(() => { console.log("Sequence 1"); }, 0);
// setTimeout(() => { console.log("Sequence 2"); }, 1);
// setTimeout(() => { console.log("Sequence 3"); }, 20);
// setTimeout(() => { console.log("Sequence 4"); }, 30);


function getStudents(callback) {
  fs.readFile("data/student.json", function(err, data) {
    if (err) {
      callback(err);
    } else {
      const students = JSON.parse(data);
      callback(null, students);
    }
  });
}

getStudents(function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
