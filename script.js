const handleForm = (e) => {
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
};

const preselectMenu = (element, option) => {
  const nodes = element.childNodes;
  nodes.forEach((node) => {
    if (node.value == option) {
      node.selected = true;
    }
  });
  element.id = ""; // prevents duplicate id(s) of dropdown menus

  return element;
};

const handleMenuEdit = (obj, property) => {
  return (e) => {
    if (property == "type") {
      library[obj].updateProperty(property, e.target.value);
    } else if (property == "status") {
      library[obj].updateProperty(property, e.target.value);
    }
  };
};

const displayRow = (rowData, associatedObj) => {
  const tableBody = document.querySelector("tbody");
  const tableRow = document.createElement("tr");
  tableRow.dataset.id = associatedObj;
  // re-uses dropdown menus
  const typeMenu = document.querySelector("#type");
  const typeMenuClone = typeMenu.cloneNode(true);
  const statusMenu = document.querySelector("#status");
  const statusMenuClone = statusMenu.cloneNode(true);

  rowData.forEach((cellValue, index, array) => {
    const tableCell = document.createElement("td");
    const input = document.createElement("input");
    const sortedTypeMenu = preselectMenu(typeMenuClone, cellValue);
    const sortedStatusMenu = preselectMenu(statusMenuClone, cellValue);
    const linkElement = document.createElement("a");

    if (index == array.length - 1) {
      linkElement.href = cellValue;
      linkElement.target = "_blank";
      linkElement.textContent = cellValue;
      tableCell.className = "link";
      tableCell.appendChild(linkElement);
    } else if (index == 2) {
      sortedTypeMenu.addEventListener(
        "input",
        handleMenuEdit(associatedObj, "type")
      );
      tableCell.appendChild(sortedTypeMenu);
    } else if (index == 3) {
      sortedStatusMenu.addEventListener(
        "input",
        handleMenuEdit(associatedObj, "status")
      );
      tableCell.appendChild(sortedStatusMenu);
    } else {
      input.type = "text";
      input.value = cellValue;
      input.addEventListener("change", (e) => {
        const property = index == 0 ? "title" : "author";
        library[associatedObj].updateProperty(property, e.target.value);
        e.target.blur();
      });
      tableCell.appendChild(input);
    }

    tableRow.appendChild(tableCell);
    tableBody.appendChild(tableRow);
  });
};

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

const handleCreation = (e) => {
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
};

const newBtn = document.querySelector(".new-btn");
newBtn.addEventListener("click", handleForm);

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", handleForm);

const library = [];

const createBtn = document.querySelector(".form-btn");
createBtn.addEventListener("click", handleCreation);
