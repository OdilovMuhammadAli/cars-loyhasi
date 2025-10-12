import { getAll } from "./request.js";
import { ui } from "./ui.js";

const elOfflinePage = document.getElementById("offlinePage");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValueSelect = document.getElementById("filterValueSelect");

let beckendData = null;
let worker = new Worker("./worker.js");

window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    elOfflinePage.classList.remove("hidden");
  } else {
    elOfflinePage.classList.add("hidden");
  }

  getAll()
    .then((res) => {
      beckendData = res;
      ui(beckendData.data);
    })
    .catch((error) => {
      alert(error.message);
    });
});

elFilterTypeSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  if (beckendData) {
    worker.postMessage({
      functionName: "filterByType",
      params: [beckendData.data, value],
    });
  }
});

worker.addEventListener("message", (evt) => {
  const result = evt.data;
  elFilterValueSelect.classList.remove("hidden");
  elFilterValueSelect.innerHTML = "";
  const option = document.createElement("option");
  option.selected = true;
  option.disabled = true;
  option.textContent = "All";
  elFilterValueSelect.appendChild(option);
  result.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element;
    option.value = element;
    elFilterValueSelect.appendChild(option);
  });
});

window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden");
});
window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden");
});
