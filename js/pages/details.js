const elTitle = document.getElementById("name");
const elDatailsDescription = document.getElementById("description");
const category = document.getElementById("category");
const color = document.getElementById("color");
const colorName = document.getElementById("colorName");
const country = document.getElementById("country");
const doorCount = document.getElementById("doorCount");
const engine = document.getElementById("engine");
const fuelConsumption = document.getElementById("fuelConsumption");
const city = document.getElementById("city");
const combiend = document.getElementById("combiend");
const highway = document.getElementById("highway");
const fuelType = document.getElementById("fuelType");
const horsepower = document.getElementById("horsepower");
const generation = document.getElementById("generation");
const maxSpeed = document.getElementById("maxSpeed");
const seatCount = document.getElementById("seatCount");
const trim = document.getElementById("trim");
const year = document.getElementById("year");
const colorBg = document.getElementById("colorBg");

async function getById(id) {
  document.title = "Yuklanmoqda...";
  try {
    const req = await fetch(`https://json-api.uz/api/project/fn44/cars/${id}`);
    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ma`lumotni olishda xatolik bo`ldi");
  }
}

function ui(data) {
  document.title = data.name;
  elTitle.innerText = data.name;
  colorBg.style.background = data.color;
  category.textContent = data.category;
  colorName.textContent = "ColorName: " + data.colorName;
  country.textContent = "Davlat" + data.country;
  doorCount.textContent = "DoorCount: " + data.doorCount;
  engine.textContent = "Engine: " + data.engine;
  fuelConsumption.textContent = "FuelConsumption: " + data.fuelConsumption;
  city.textContent = "City: " + data.city;
  combiend.textContent = "Combiend: " + data.combiend;
  highway.textContent = "Highway: " + data.highway;
  fuelType.textContent = "FuelType: " + data.fuelType;
  horsepower.textContent = "HorsePower: " + data.horsepower;
  generation.textContent = "Generation: " + data.generation;
  maxSpeed.textContent = "MaxSpeed: " + data.maxSpeed;
  seatCount.textContent = "SeatCount: " + data.seatCount;
  trim.textContent = "Trim: " + data.trim;
  year.textContent = "Year: " + data.year;
}

window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");

  getById(id)
    .then((res) => {
      ui(res);
    })
    .catch(() => {})
    .finally(() => {});
});
