import {
  renderError,
  renderPlanet,
  renderPlanets,
  renderSpinner,
} from "./render.js";

export let planetData;

async function getPlanets() {
  try {
    renderSpinner();
    let res = await fetch("https://majazocom.github.io/Data/solaris.json");
    console.log(res);
    if (!res.ok)
      throw new Error(
        `Fel vid hämtning av data (${res.status}). Försök igen senare.`
      );
    planetData = await res.json();

    // För att visa att render spinner fungerar
    setTimeout(function () {
      renderPlanets(planetData);
    }, 500);
  } catch (err) {
    renderError(err.message);
  }
}
getPlanets();

//////////////////// Sökfunktion ///////////////////////////

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = document.getElementById("search-input").value;
  searchPlanet(inputValue);
  document.getElementById("search-input").value = ``;
});

function searchPlanet(inputValue) {
  let planetIndex;
  if (
    planetData.some(
      (planet) => planet.name.toLowerCase() === inputValue.toLowerCase()
    )
  ) {
    const result = planetData.filter((planet, index) => {
      if (planet.name.toLowerCase() === inputValue.toLowerCase()) {
        planetIndex = index;
        return planet;
      }
    });

    const [planet] = result;
    renderPlanet(planet, planetIndex);
  }

  if (
    !planetData.some(
      (planet) => planet.name.toLowerCase() === inputValue.toLowerCase()
    )
  ) {
    renderError(
      `Kan ej hitta någon planet som matchar söktermen: "${inputValue}".`
    );
  }
}
