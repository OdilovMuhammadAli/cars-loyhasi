import { checkAuth } from "./check-auth.js";
import { deleteElementLocal, editElementLocal } from "./crud.js";
import { changeLocalDaa, localData } from "./localData.js";
import { deleteById, editElement, getAll } from "./request.js";
import { ui } from "./ui.js";

const elEditedForm = document.getElementById("editForm");
const elEditModal = document.getElementById("editModal");
const elContainer = document.getElementById("container");
const elOfflinePage = document.getElementById("offlinePage");
const elFilterTypeSelect = document.getElementById("filterTypeSelect");
const elFilterValueSelect = document.getElementById("filterValueSelect");
const elSearchInput = document.getElementById("searchInput");

let beckendData = null;
let worker = new Worker("./worker.js");
let filterKey = null;
let filterValue = null;
let uiData = null;
let editedElmentId = null;
window.addEventListener("DOMContentLoaded", () => {
  if (window.navigator.onLine === false) {
    elOfflinePage.classList.remove("hidden");
  } else {
    elOfflinePage.classList.add("hidden");
  }

  getAll()
    .then((res) => {
      beckendData = res;
      changeLocalDaa(beckendData.data);
      ui(uiData);
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
    params: [beckendData.data, value],
  });
});
elFilterTypeSelect.addEventListener("change", (evt) => {
  const value = evt.target[evt.target.selectedIndex].value;
  filterValue = value;
  const elContainer = document.getElementById("container");
  elContainer.innerHTML = "";
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
    params: [beckendData.data, key],
  });
});

worker.addEventListener("message", (evt) => {
  console.log(evt);

  // select
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
      alert("no-nono");
    }
  }
});

window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden");
});
window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden");
});
// CRUD
elContainer.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("js-edit")) {
    if (checkAuth()) {
      editedElmentId = target.id;
      elEditModal.showModal();
      const findElement = localData.find((el) => el.id === target.id);

      elEditedForm.name.value = findElement.name;
      elEditedForm.description.value = findElement.description;
    } else {
      window.location.href = "/pages/register.html";
      alert("Royxatdan otishingiz shart");
    }
  }

  if (target.classList.contains("js-delete")) {
    if (checkAuth() && confirm("rostan ochirasmi?")) {
      deleteById(target.id)
        .then((id) => {
          console.log(id);

          deleteElementLocal(id);
        })
        .catch(() => {})
        .finally(() => {});
    } else {
      window.location.href = "/pages/register.html";
      alert("Royxatdan otishingiz shart");
    }
  }
  if (target.classList.contains("js-info")) {
    if (checkAuth()) {
    } else {
      window.location.href = "/pages/register.html";
      alert("Royxatdan otishingiz shart");
    }
  }
});
elEditedForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const forDataReg = new FormData(elEditedForm);
  const result = {};
  FormData.forEach((value, key) => {
    result[key] = value;
  });
  if (editedElmentId) {
    result.id = editedElmentId;
    editElement(result)
      .then((res) => {
        editElementLocal(res);
      })
      .catch(() => {})
      .finally(() => {
        editedElmentId = null;
        elEditModal.close();
      });
  }
});
