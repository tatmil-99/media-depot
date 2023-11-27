const newBtn = document.querySelector(".new-btn");
const closeBtn = document.querySelector(".close-btn");

newBtn.addEventListener("click", handleForm);
closeBtn.addEventListener("click", handleForm);

function handleForm(e) {
  const form = document.querySelector(".form-container");
  const background = document.querySelectorAll("header, main, footer");

  if (e.target.className == "new-btn") {
    form.style.display = "flex";
    background.style.filter = "blur(4px) brightness(40%)";
  } else if (e.target.className == "close-btn") {
    form.style.display = "none";
    background.style.filter = "none";
  }
}
