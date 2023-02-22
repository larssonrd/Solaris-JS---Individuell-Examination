import { planetData } from "./index.js";
import { renderPlanet } from "./render.js";

export function addHandlerPagination() {
  const nextBtn = document.getElementById("pagination-next-btn");
  const prevBtn = document.getElementById("pagination-prev-btn");
  nextBtn.addEventListener("click", function () {
    nextPage();
  });
  prevBtn.addEventListener("click", function () {
    previousPage();
  });
}

function nextPage() {
  const currentPlanetIndex = +document.getElementById("planet-name").dataset.index;
  if (currentPlanetIndex < planetData.length - 1) {
    renderPlanet(planetData[currentPlanetIndex + 1], currentPlanetIndex + 1);
  }
}

function previousPage() {
  const currentPlanetIndex = +document.getElementById("planet-name").dataset.index;
  if (currentPlanetIndex > 0) {
    renderPlanet(planetData[currentPlanetIndex - 1], currentPlanetIndex - 1);
  }
}

export function hidePaginationBtn() {
  const currentPlanetIndex = +document.getElementById("planet-name").dataset.index;
  if (currentPlanetIndex === 0) {
    document.getElementById("pagination-prev-btn").style.opacity = 0;
  }
  if (currentPlanetIndex === planetData.length - 1) {
    document.getElementById("pagination-next-btn").style.opacity = 0;
  }
}
