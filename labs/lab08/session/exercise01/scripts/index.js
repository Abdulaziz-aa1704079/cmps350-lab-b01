// let samples = [];
let db = new Localbase('census');

document.addEventListener("DOMContentLoaded", start);

async function start() {
    // await db.collection("samples").delete();
    let formElement = document.querySelector("#form");
    let noRowsElement = document.querySelector("#noOfRows");
    formElement.addEventListener("submit", e => submitForm(e));
    noRowsElement.addEventListener("change", updateTableHTML);
    await updateTableHTML();

    // blocking the main event loop for five seconds
    // console.log("start");
    // let start = Date.now();
    // do { } while (Date.now() - start < 5000);
    // console.log("end");
}

async function updateTableHTML() {
    document.querySelector("#countries").innerHTML = "";

    let noRowsElement = document.querySelector("#noOfRows");
    let noRows = parseInt(noRowsElement.value);

    let samples = await db.collection("samples").limit(noRows).get();
    samples.forEach(createRowHTML);
}

async function submitForm(e) {
    e.preventDefault();

    const formElement = document.querySelector("#form");
    const formData = new FormData(formElement);
    const sample = Object.fromEntries(formData.entries());

    if (document.querySelector("#add-btn").dataset &&
        document.querySelector("#add-btn").dataset.mode === "update") {
        // console.log("update");
        // let index = samples.map(s => s.id).indexOf(sample.id);
        // samples[index] = sample;

        await db.collection("samples").doc({id: sample.id}).set(sample);
        let rowElement = document.querySelector(`#countries > tr[data-id="${sample.id}"]`);
        // console.log(rowElement);
        rowElement.children[0].innerText = sample.country;
        rowElement.children[1].innerText = sample.population;

        document.querySelector("#add-btn").dataset.mode = "";
        document.querySelector("#add-btn").value = "Add";
    } else {
        // console.log("add");
        sample.id = String(Date.now());
        // samples.push(sample);
        await db.collection("samples").add(sample);
        createRowHTML(sample);
    }

    formElement.reset();
}

function createRowHTML(sample) {
    // innerHTML += `<tr>
    //     <td>Country</td>
    //     <td>Population</td>
    //     <td>
    //
    //     </td>
    // </tr>`

    let row = document.createElement("tr");
    row.dataset.id = sample.id;
    let countryData = document.createElement("td");
    countryData.innerText = sample.country;
    let populationData = document.createElement("td");
    populationData.innerText = sample.population;
    let actionData = document.createElement("td");
    let editAction = document.createElement("button");
    editAction.innerText = "Edit";
    editAction.addEventListener("click", e => editSample(e, sample.id));
    let deleteAction = document.createElement("button");
    deleteAction.innerText = "Delete";
    deleteAction.addEventListener("click", e => deleteSample(e, sample.id));
    actionData.appendChild(editAction);
    actionData.appendChild(deleteAction);

    row.appendChild(countryData);
    row.appendChild(populationData);
    row.appendChild(actionData);
    let table = document.querySelector("#countries");

    if (!table.children.length) {
        table.innerHTML += `<thead><tr><th>Country</th><th>Population</th><th>Actions</th></tr></thead>`;
    }
    table.appendChild(row);
}

async function editSample(e, id) {
    // let sample = samples.find(s => s.id === id);
    let sample = await db.collection("samples").doc({ id: id }).get();
    const idElement = document.querySelector("#id");
    const countryElement = document.querySelector("#country");
    const populationElement = document.querySelector("#population");
    idElement.value = sample.id;
    countryElement.value = sample.country;
    populationElement.value = sample.population;

    document.querySelector("#add-btn").value = "Update";
    document.querySelector("#add-btn").dataset.mode = "update";
}

async function deleteSample(e, id) {
    // samples = samples.filter(sample => sample.id !== id);
    await db.collection("samples").doc({ id: id }).delete();
    // or use .indexOf follow by .splice
    document.querySelector(`#countries > tr[data-id="${id}"]`).remove();

    let table = document.querySelector("#countries");
    if (table.children.length === 1) {
        table.innerHTML = "";
    }
}
