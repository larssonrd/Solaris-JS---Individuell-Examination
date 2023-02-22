import { renderError, renderPlanet, renderPlanets, renderSpinner } from "./render.js";

export let planetData = await getJSON();
const searchBtn = document.getElementById("search-btn");

async function getJSON() {
  try {
    renderSpinner();
    const res = await fetch("https://majazocom.github.io/Data/solaris.json");
    if (!res.ok) throw new Error(`Fel vid hämtning av data (${res.status}). Försök igen senare.`);
    const data = await res.json();
    return data;
  } catch (err) {
    renderError(err.message);
  }
}

if (planetData) renderPlanets(planetData);

//////////////////// Sökfunktion ///////////////////////////

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = document.getElementById("search-input").value;
  searchPlanet(inputValue);
});

function searchPlanet(inputValue) {
  const planet = planetData.find(
    (planet) => planet.name.toLowerCase() === inputValue.toLowerCase()
  );

  if (planet) {
    const planetIndex = planetData.indexOf(planet);
    renderPlanet(planet, planetIndex);
  }

  if (!planet) {
    renderError(`Kan inte hitta någon planet som matchar söktermen: "${inputValue}".`);
    document.getElementById("search-input").value = ``;
  }
}
