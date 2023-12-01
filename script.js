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

function preselect(element, option) {
  const nodes = element.childNodes;

  nodes.forEach((node) => {
    if (node.value == option) {
      node.selected = true;
    }
  });

  element.id = ""; // prevents duplicate id(s) of form menus
  return element;
}

function displayRow(...mediaList) {
  const tableBody = document.querySelector("tbody");
  const tableRow = document.createElement("tr");
  const linkElement = document.createElement("a");

  const type = document.querySelector("#type");
  const typeClone = type.cloneNode(true);
  const status = document.querySelector("#status");
  const statusClone = status.cloneNode(true);

  // logic for associating input with cells
  for (let i = 0; i <= mediaList.length - 1; i++) {
    const tableCell = document.createElement("td");

    if (i == mediaList.length - 1) {
      linkElement.href = mediaList[i];
      linkElement.target = "_blank";
      linkElement.textContent = mediaList[i];
      tableCell.appendChild(linkElement);
    } else if (i == 2) {
      let selectedType = preselect(typeClone, mediaList[i]);
      tableCell.appendChild(selectedType);
    } else if (i == 3) {
      statusClone.id = "";
      tableCell.appendChild(statusClone);
    } else {
      tableCell.textContent = mediaList[i];
    }

    // tableCell.addEventListener("click", editCell);
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
