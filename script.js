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

function editCell(associatedObj) {
  return (e) => {
    const input = document.createElement("input");
    const cell = e.target;
    const cellClass = cell.className;

    // displays input for cells in gui
    if (cellClass == "title" || cellClass == "author") {
      input.type = "text";
      input.autofocus = "autofocus";
      input.value = cell.textContent;
      input.name = `cell-${cellClass}`;
      cell.replaceChildren(input);

      // updates object in library after gui edit
      // note: can unbind this event if i need to
      // move the event to a parent element to handle menu changes
      input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          cell.textContent = input.value;

          for (let i = 0; i <= library.length; i++) {
            if (i == associatedObj) {
              console.log(cellClass);
              console.log(library[i]);
              library[i].setProperty({ [cellClass]: input.value });
              console.log(library[i]);
            }
          }
        }
      });
    }
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

    if (i == mediaList.length - 1) {
      linkElement.href = mediaList[i];
      linkElement.target = "_blank";
      linkElement.textContent = mediaList[i];
      tableCell.className = "link";
      tableCell.appendChild(linkElement);
    } else if (i == 2) {
      menu = preselectMenu(typeMenuClone, mediaList[i]);
      tableCell.className = "select";
      tableCell.appendChild(menu);
    } else if (i == 3) {
      menu = preselectMenu(statusMenuClone, mediaList[i]);
      tableCell.className = "status";
      tableCell.appendChild(menu);
    } else {
      tableCell.className = i == 0 ? "title" : "author";
      tableCell.textContent = mediaList[i];
    }

    tableCell.addEventListener("click", editCell(associatedObj));
    tableRow.appendChild(tableCell);
    tableBody.appendChild(tableRow);
  }
}

function Media(title, author, type, status, link) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.status = status;
  this.link = link;
}

Media.prototype.setProperty = function (property) {
  const constructorKeys = Object.keys(this);
  const propertyKey = Object.keys(property)[0];

  constructorKeys.forEach((key) => {
    if (key == propertyKey) this[key] = property[propertyKey];
  });
};

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
