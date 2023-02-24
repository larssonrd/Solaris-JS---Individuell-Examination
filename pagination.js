import { planetData } from "./index.js";
import { renderPlanet } from "./render.js";

function getCurrPlanetIndex() {
  return +document.getElementById("planet-name").dataset.index;
}

//Lägger till eventlyssnare efter planet renderats
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
  if (getCurrPlanetIndex() < planetData.length - 1) {
    renderPlanet(planetData[getCurrPlanetIndex() + 1], getCurrPlanetIndex() + 1);
  }
}

function previousPage() {
  if (getCurrPlanetIndex() > 0) {
    renderPlanet(planetData[getCurrPlanetIndex() - 1], getCurrPlanetIndex() - 1);
  }
}

export function hidePaginationBtn() {
  if (getCurrPlanetIndex() === 0) {
    document.getElementById("pagination-prev-btn").style.visibility = "hidden";
  }
  if (getCurrPlanetIndex() === planetData.length - 1) {
    document.getElementById("pagination-next-btn").style.visibility = "hidden";
  }
}
