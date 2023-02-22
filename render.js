import { addHandlerPagination, hidePaginationBtn } from "./pagination.js";

const planetsEl = document.querySelector(".planets");

export function renderSpinner() {
  const markup = `
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      `;
  planetsEl.style.justifyContent = "center";
  planetsEl.innerHTML = markup;
}

//Error handling
export function renderError(err) {
  const markup = `<p class="error-message">${err} </p>`;
  planetsEl.style.justifyContent = "center";
  planetsEl.innerHTML = markup;
}

export function renderPlanets(data) {
  planetsEl.innerHTML = ``;
  data.forEach((planet, index) => {
    const newPlanetEl = document.createElement("div");
    newPlanetEl.className = "planet";
    newPlanetEl.id = planet.name.toLowerCase();
    planetsEl.insertAdjacentElement("beforeend", newPlanetEl);

    newPlanetEl.addEventListener("click", function (event) {
      renderPlanet(planet, index);
    });
  });

  planetsEl.style.justifyContent = "space-between";
}

export function renderPlanet(planet, index) {
  const markup = `
    <div id="pagination-previous">
    <div id="go-to-startpage">
    <a href="./index.html" id="go-to-startpage__btn">Till startsidan</a>
    </div>
          <button id="pagination-prev-btn">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div id="planet-info">
          <h1 id="planet-name" data-index="${index}">${planet.name}</h1>
          <h3 id="planet-name-latin">${planet.latinName}</h3>
          <p id="planet-description">
              ${planet.desc}
          </p>
          <div class="details">
            <div class="details-row">
              <div class="detail">
                <h4>OMKRETS</h4>
                <p>${planet.circumference} km</p>
              </div>
              <div class="detail">
                <h4>KM FRÅN SOLEN</h4>
                <p>${planet.distance} km</p>
              </div>
            </div>
            <div class="details-row">
              <div class="detail">
                <h4>DAG TEMPERATUR</h4>
                <p>${planet.temp.day}°c</p>
              </div>
              <div class="detail">
                <h4>NATT TEMPERATUR</h4>
                <p>${planet.temp.night}°c</p>
              </div>
            </div>
          </div>
          <div class="details-moons">
            <h4>MÅNAR</h4>
            <p>${
              planet.moons.length === 0
                ? ` ${planet.name} har inga månar.`
                : planet.moons.join(", ")
            }</p>
          </div>
        </div>
        <div id="pagination-next">
          <button id="pagination-next-btn">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>`;
  document.querySelector(".root").classList.add("planet-view");
  document.querySelector(".root").innerHTML = markup;
  hidePaginationBtn();
  addHandlerPagination();
}
