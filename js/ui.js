export function ui(data) {
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = null;
  data.forEach((element) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content;

    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("#description");
    const elYear = clone.querySelector("#year");
    const elCountry = clone.querySelector("#country");
    const elCategory = clone.querySelector("#category");
    const elMaxSpeed = clone.querySelector("#maxSpeed");
    const elHorsePower = clone.querySelector("#horsepower");
    const elColorName = clone.querySelector("#colorName");

    const elEditBtn = clone.querySelector(".js-edit");
    const elDeleteBtn = clone.querySelector(".js-delete");
    const elInfoBtn = clone.querySelector(".js-info");

    elEditBtn.id = element.id;
    elDeleteBtn.id = element.id;
    elInfoBtn.href = `/pages/details.html?id=${element.id}`;

    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    elYear.innerHTML = `<strong>Yil:</strong> ${element.year}`;
    elColorName.innerHTML = `<strong>Rang:</strong> ${element.colorName}`;
    elCountry.innerHTML = `<strong>Davlat:</strong> ${element.country}`;
    elCategory.innerHTML = `<strong>Turkum:</strong> ${element.category}`;
    elMaxSpeed.innerHTML = `<strong>Max Tezligi:</strong> ${element.maxSpeed}`;
    elHorsePower.innerHTML = `<strong>Ot kuchi:</strong> ${element.horsepower}`;
    elContainer.append(clone);
  });
}

export function pagination(total, limit, skip) {
  const elPagination = document.getElementById("pagination");
  elPagination.innerHTML = "";
  const remained = total % limit;
  const pageCount = (total - remained) / limit;
  let activePage = skip / limit + 1;

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.classList.add("join-item", "btn", "js-page");
    if (activePage === i) {
      button.classList.add("btn-active");
    }
    button.innerText = i;
    button.dataset.limit = "";

    if (i > 1) {
      button.dataset.skip = limit * i - limit;
    }

    elPagination.appendChild(button);
  }
  if (remained > 0) {
    const button = document.createElement("button");
    button.classList.add("join-item", "btn", "js-page");
    if (activePage === pageCount + 1) {
      button.classList.add("btn-active");
    }
    button.innerText = pageCount + 1;
    elPagination.appendChild(button);
    button.dataset.skip = pageCount * limit;
  }
}
