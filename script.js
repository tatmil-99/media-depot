const newBtn = document.querySelector(".new-btn");
const closeBtn = document.querySelector(".close-btn");

newBtn.addEventListener("click", handleForm);
closeBtn.addEventListener("click", handleForm);

function handleForm(e) {
  const form = document.querySelector(".form-container");

  if (e.target.className == "new-btn") {
    form.style.display = "flex";
  } else if (e.target.className == "close-btn") {
    form.style.display = "none";
  }
}
