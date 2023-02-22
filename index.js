import { renderError, renderPlanet, renderPlanets, renderSpinner } from "./render.js";

export let planetData;
const searchBtn = document.getElementById("search-btn");

async function getPlanets() {
  try {
    renderSpinner();
    let res = await fetch("https://majazocom.github.io/Data/solaris.json");
    if (!res.ok) throw new Error(`Fel vid hämtning av data (${res.status}). Försök igen senare.`);
    planetData = await res.json();
    renderPlanets(planetData);
  } catch (err) {
    renderError(err.message);
  }
}
getPlanets();

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
