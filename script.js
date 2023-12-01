const newBtn = document.querySelector(".new-btn");
newBtn.addEventListener("click", handleForm);

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", handleForm);

const mediaList = [];

const createBtn = document.querySelector(".form-btn");
createBtn.addEventListener("click", handleCreation);

function handleForm(e) {
  const form = document.querySelector(".form-container");
  const container = document.querySelector(".container");
  const btnClass = e.target.className;

  if (btnClass == "new-btn") {
    form.style.display = "flex";
    container.style.filter = "blur(4px) brightness(40%)";
  } else if (btnClass == "close-btn") {
    form.style.display = "none";
    container.style.filter = "none";
  }
}

function Media(title, author, type, status, link) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.status = status;
  this.link = link;
}

function editCell(e) {
  let cell = e.target;
  let input = document.createElement("input");

  input.classList.add("edit-field");
  input.type = "text";
  input.autofocus = "autofocus";
  input.value = cell.textContent;

  cell.replaceChildren(input);
}

function displayRow(...mediaList) {
  let tableBody = document.querySelector("tbody");
  let tableRow = document.createElement("tr");
  let linkElement = document.createElement("a");

  for (let i = 0; i <= mediaList.length - 1; i++) {
    let tableCell = document.createElement("td");
    // logic for associating input with cells
    if (i == mediaList.length - 1) {
      linkElement.href = mediaList[i];
      linkElement.target = "_blank";
      linkElement.textContent = mediaList[i];
      tableCell.appendChild(linkElement);
    } else {
      tableCell.textContent = mediaList[i];
    }

    tableCell.addEventListener("click", editCell);
    tableRow.appendChild(tableCell);
    tableBody.appendChild(tableRow);
  }
}

function handleCreation(e) {
  const form = document.querySelector(".media-form");
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const type = document.querySelector("#type").value;
  const status = document.querySelector("#status").value;
  const link = document.querySelector("#link").value;

  e.preventDefault();

  const media = new Media(title, author, type, status, link);
  mediaList.push(media);

  displayRow(title, author, type, status, link);

  form.reset();
}
