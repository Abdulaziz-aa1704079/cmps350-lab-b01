// alert("courses");

// detect change
// update list of courses
//   insert html code or update DOM
//   many ways at least to update the DOM

document.addEventListener("DOMContentLoaded", () => {
  const programsDOMElement = document.querySelector("#programs");
  // if (programsDOMElement) {
    // listen to change event
    programsDOMElement.addEventListener("change", updatePrograms);
  // }
});

async function updatePrograms() {
  const programsDOMElement = document.querySelector("#programs");
  const coursesDOMElement = document.querySelector("#courses");

  // client-side + API request (JSON) + client-side rendering
  // fetch JSON data through API
  const response = await fetch(`/api/courses/${programsDOMElement.value}`);
  const courses = await response.json();

  // use DOM elements to generate the representation
  // document.createElement("thead");
  // ...

  // use string literals to generate tags
  /*
  coursesDOMElement.innerHTML = "<thead><tr><th>Code</th><th>Name</th></tr></thead>";
  coursesDOMElement.innerHTML += "<tbody>";
  courses.forEach(course => {
    coursesDOMElement.innerHTML += `<tr><td>${course.code}</td><td>${course.name}</td></tr>`;
  });
  coursesDOMElement.innerHTML += "</tbody>";
  */

  // use Handlebars template
  const templateString = `
  <thead>
    <tr>
      <th>Code</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    {{#each courses}}
    <tr>
      <td>{{this.code}}</td>
      <td>{{this.name}}</td>
    </tr>
    {{/each}}
  </tbody>`;
  const template = Handlebars.compile(templateString);
  coursesDOMElement.innerHTML = template({ courses });

  // server-side rendering
  /*
  const response = await fetch(`/api/courses/${programsDOMElement.value}/html`);
  const coursesHTML = await response.text();
  coursesDOMElement.innerHTML = coursesHTML;
  */
}
