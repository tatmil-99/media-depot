const newBtn = document.querySelector(".new-btn");
const closeBtn = document.querySelector(".close-btn");
newBtn.addEventListener("click", handleForm);
closeBtn.addEventListener("click", handleForm);

const formBtn = document.querySelector(".form-btn");

function Media(title, author, type, status, link) {
  this.title = title;
  this.author = author;
  this.type = type;
  this.status = status;
  this.link = link;
}

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
