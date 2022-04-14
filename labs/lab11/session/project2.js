/*
1)	We need to read data from two files. course.json and staff.json. Both using callbacks.
2)	We need finally print all courses with their corresponding instructor names.
a)	Instructor name can be found at the staff file.
b)	Use staffNo in staff.json property to match the instructorId from course.json
3)	Create two functions getCourses and setInstructorNames.
function getCourses(cb)
	function setInstrctorNames(courses , cb)
4)	Instructor names are set as a new property to the course object in the setInstrctorNames function.
 */

import fs from "fs";

function getCourses(callback) {
	fs.readFile("data/course.json", function(err, data) {
		if (err) {
			callback(err);
		} else {
			const courses = JSON.parse(data);
			setInstructorNames(courses, callback);
		}
	});
}

function setInstructorNames(courses, callback) {
	fs.readFile("data/staff.json", function(err, data) {
		if (err) {
			callback(err);
		} else {
			const staff = JSON.parse(data);

			for (const course of courses) {
				const instructor = staff.find(staff => staff.staffNo === course.instructorId);
				course.instructorName = instructor.firstname + " " + instructor.lastname;
			}

			// courses = courses.map(course => {
			// 	const instructor = staff.find(staff => staff.staffNo === course.instructorId);
			// 	return {
			// 		...course,
			// 		instructorName: instructor.firstname + " " + instructor.lastname,
			// 	};
			// });

			callback(null, courses);
		}
	});
}

// what you do with the result
function callback(err, data) {
	if (err) {
		console.error(err);
	} else {
		// do whatever you want with the result
		console.log(data);
	}
}

// get the courses with corresponding instructor name
getCourses(callback);
// console.log(data);
