import { checkAuth } from "./check-auth.js";
import { deleteElementLocal } from "./crud.js";
import { changeLocalData } from "./localData.js";
import { deleteElement, getAll } from "./request.js";
import { ui } from "./ui.js";

const elOfflinePage = document.getElementById("offlinePage");
const elFilterValueSelect = document.getElementById("filterValueSelect");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elSearchInput = document.getElementById("searchInput");
const elFilterInput = document.getElementById("filterInput");
const elLoading = document.getElementById("loading");

let backendData = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;

window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === true) {
    elOfflinePage.classList.add("hidden");
  } else {
    elOfflinePage.classList.remove("hidden");
  }

  getAll()
    .then((res) => {
      backendData = res;
      changeLocalData(backendData.data);
      elLoading.classList.add("hidden");
      elFilterInput.classList.remove("hidden");
      elFilterInput.classList.add("flex");
    })
    .catch((error) => {
      alert(error.message);
    });
});

elFilterTypeSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterKey = value;
  worker.postMessage({
    functionName: "filterByType",
    params: [backendData.data, value],
  });
});

elFilterValueSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterValue = value;

  elContainer.innerHTML = null;

  if (filterKey && filterValue) {
    getAll(`?${filterKey}=${filterValue}`)
      .then((res) => {
        ui(res.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

elSearchInput.addEventListener("input", (evt) => {
  const key = evt.target.value;
  worker.postMessage({
    functionName: "search",
    params: [backendData.data, key],
  });
});

worker.addEventListener("message", (evt) => {
  // Select
  const response = evt.data;

  if (response.target === "filterByType") {
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
  } else if (response.target === "search") {
    const elContainer = document.getElementById("container");
    elContainer.innerHTML = null;
    if (response.result.length > 0) {
      ui(response.result);
    } else {
      alert("No data");
    }
  }
});

window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden");
});

window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden");
});

// Crud
const elContainer = document.getElementById("container");

elContainer.addEventListener("click", (evt) => {
  const target = evt.target;

  // Edit
  if (target.classList.contains("js-edit")) {
    if (checkAuth()) {
    } else {
      alert("Ro`yxatdan o`tishingiz kerak");
    }
  }

  // Delete

  if (target.classList.contains("js-delete")) {
    if (checkAuth() && confirm("Rostdan ham o`chirmoqchimisiz?")) {
      elContainer.innerHTML = null;
      elLoading.classList.remove("hidden");
      elFilterInput.classList.add("hidden");
      elFilterInput.classList.remove("flex");
      deleteElement(target.id)
        .then((id) => {
          deleteElementLocal(id);
        })
        .catch()
        .finally(() => {
          elLoading.classList.add("hidden");
          elFilterInput.classList.remove("hidden");
          elFilterInput.classList.add("flex");
        });
    } else {
      location.href = "./pages/login.html";
      alert("Ro`yxatdan o`tishingiz kerak");
    }
  }
});
