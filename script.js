const newBtn = document.querySelector(".new-btn");
newBtn.addEventListener("click", handleForm);

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", handleForm);

const library = [];

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

function editCell(rowDataId) {
  return (e) => {
    const input = document.createElement("input");
    const cell = e.target;
    const cellClass = cell.className;

    // displays input element for cells in gui
    if (cellClass == "title" || cellClass == "author") {
      input.type = "text";
      input.autofocus = "autofocus";
      input.value = cell.textContent;
      input.name = `cell-${cellClass}`;
      cell.replaceChildren(input);
    }

    // detects if a menu has been selected for editing
    if (cellClass == "type" || cellClass == "status") {
      const menuChildren = cell.children;

      console.log(`obj: ${rowDataId}, property: `, menuChildren);
    }

    // updates associated object from library after gui edit
    input.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        cell.textContent = input.value; // unbinds event by removing input
        library[rowDataId].updateProperty(cellClass, input.value);
      }
    });
  };
}

function preselectMenu(element, option) {
  const nodes = element.childNodes;

  nodes.forEach((node) => {
    if (node.value == option) {
      node.selected = true;
    }
  });

  element.id = ""; // prevents duplicate id(s) of dropdown menus
  element.addEventListener("input", (e) => console.log(e.target.value));

  return element;
}

function displayRow(mediaList, associatedObj) {
  const tableBody = document.querySelector("tbody");
  const tableRow = document.createElement("tr");
  tableRow.dataset.id = associatedObj;
  const linkElement = document.createElement("a");

  // re-uses dropdown menus
  const typeMenu = document.querySelector("#type");
  const typeMenuClone = typeMenu.cloneNode(true);
  const statusMenu = document.querySelector("#status");
  const statusMenuClone = statusMenu.cloneNode(true);

  let menu;

  // logic for associating input with cells
  for (let i = 0; i <= mediaList.length - 1; i++) {
    const tableCell = document.createElement("td");
    const input = document.createElement("input");

    if (i == mediaList.length - 1) {
      linkElement.href = mediaList[i];
      linkElement.target = "_blank";
      linkElement.textContent = mediaList[i];
      tableCell.className = "link";
      tableCell.appendChild(linkElement);
    } else if (i == 2) {
      menu = preselectMenu(typeMenuClone, mediaList[i]);
      tableCell.className = "type";
      tableCell.appendChild(menu);
    } else if (i == 3) {
      menu = preselectMenu(statusMenuClone, mediaList[i]);
      tableCell.className = "status";
      tableCell.appendChild(menu);
    } else {
      input.type = "text";
      input.value = mediaList[i];
      input.addEventListener("change", (e) => {
        console.log(e);
        e.target.blur();
      });
      tableCell.appendChild(input);
      // tableCell.className = i == 0 ? "title" : "author";
      // tableCell.textContent = mediaList[i];
    }

    // tableCell.addEventListener("click", editCell(tableRow.dataset.id));
    tableRow.appendChild(tableCell);
    tableBody.appendChild(tableRow);
  }
}

class Media {
  constructor(title, author, type, status, link) {
    this.title = title;
    this.author = author;
    this.type = type;
    this.status = status;
    this.link = link;
  }

  updateProperty(property, value) {
    if (property in this) {
      if (this[property] == value) return;
      this[property] = value;
      console.log(this);
    }
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
  library.push(media);

  const associatedObj = library.length - 1;
  displayRow([title, author, type, status, link], associatedObj);

  form.reset();
}
