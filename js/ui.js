export function ui() {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = null;
  data.forEach((element) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");

    const elInfoBtn = clone.querySelector(".js-info");
    const elEditBtn = clone.querySelector(".js-edit");
    const elDeleteBtn = clone.querySelector(".js-delete");
    elInfoBtn.id = element.id;
    elEditBtn.id = element.id;
    elDeleteBtn.id = element.id;

    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    elContainer.appendChild(clone);
  });
}
