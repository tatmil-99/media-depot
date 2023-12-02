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

function handleKeydown(cell, input) {
  return (e) => {
    if (e.key == "Enter") cell.textContent = input.value;
  };
}

function editCell(e) {
  const input = document.createElement("input");
  const cell = e.target;

  if (cell.className == "title" || cell.className == "author") {
    input.type = "text";
    input.autofocus = "autofocus";
    input.value = cell.textContent;
    input.name = `cell-${cell.className}`;
    cell.replaceChildren(input);

    document.addEventListener("keydown", handleKeydown(cell, input));
  }
}

// should this go in editCell?
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

  const typeMenu = document.querySelector("#type");
  const typeMenuClone = typeMenu.cloneNode(true);
  const statusMenu = document.querySelector("#status");
  const statusMenuClone = statusMenu.cloneNode(true);
  let preselectedMenu;

  // logic for associating input with cells
  for (let i = 0; i <= mediaList.length - 1; i++) {
    const tableCell = document.createElement("td");

    if (i == mediaList.length - 1) {
      linkElement.href = mediaList[i];
      linkElement.target = "_blank";
      linkElement.textContent = mediaList[i];
      tableCell.className = "link";
      tableCell.appendChild(linkElement);
    } else if (i == 2) {
      preselectedMenu = preselect(typeMenuClone, mediaList[i]);
      tableCell.className = "select";
      tableCell.appendChild(preselectedMenu);
    } else if (i == 3) {
      preselectedMenu = preselect(statusMenuClone, mediaList[i]);
      tableCell.className = "status";
      tableCell.appendChild(preselectedMenu);
    } else {
      tableCell.className = i == 0 ? "title" : "author";
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
