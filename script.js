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

const displayRow = (mediaList, associatedObj) => {
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
      menu.addEventListener("input", handleMenuEdit(associatedObj, "type"));
      tableCell.appendChild(menu);
    } else if (i == 3) {
      menu = preselectMenu(statusMenuClone, mediaList[i]);
      menu.addEventListener("input", handleMenuEdit(associatedObj, "status"));
      tableCell.appendChild(menu);
    } else {
      input.type = "text";
      input.value = mediaList[i];
      input.addEventListener("change", (e) => {
        const property = i == 0 ? "title" : "author";
        library[associatedObj].updateProperty(property, e.target.value);
        e.target.blur();
      });

      tableCell.appendChild(input);
    }

    tableRow.appendChild(tableCell);
    tableBody.appendChild(tableRow);
  }
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
