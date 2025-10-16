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
    elInfoBtn.id - element.id;

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
