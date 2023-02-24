import { addHandlerPagination, hidePaginationBtn } from "./pagination.js";

const planetsEl = document.querySelector(".planets");

//Loading-spinner vid långsam fetch
export function renderSpinner() {
  const markup = `
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      `;
  planetsEl.style.justifyContent = "center";
  planetsEl.innerHTML = markup;
}

//Felhantering
export function renderError(err) {
  const markup = `<p class="error-message">${err}</p>`;
  planetsEl.style.justifyContent = "center";
  planetsEl.innerHTML = markup;
}

//Rendera ut alla planeter
export function renderPlanets(data) {
  planetsEl.innerHTML = ``;
  data.forEach((planet, index) => {
    const newPlanetEl = document.createElement("div");
    newPlanetEl.className = "planet";
    newPlanetEl.id = planet.name.toLowerCase();
    planetsEl.insertAdjacentElement("beforeend", newPlanetEl);

    newPlanetEl.addEventListener("click", function () {
      renderPlanet(planet, index);
    });
  });
  planetsEl.style.justifyContent = "space-between";
}

//Rendera ut enskild planet på egen sida
export function renderPlanet(planet, index) {
  const { name, latinName, desc, circumference, distance, temp, moons } = planet;
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
          <h1 id="planet-name" data-index="${index}">${name}</h1>
          <h3 id="planet-name-latin">${latinName}</h3>
          <p id="planet-description">
              ${desc}
          </p>
          <div class="details">
            <div class="details-row">
              <div class="detail">
                <h4>OMKRETS</h4>
                <p>${circumference} km</p>
              </div>
              <div class="detail">
                <h4>KM FRÅN SOLEN</h4>
                <p>${distance} km</p>
              </div>
            </div>
            <div class="details-row">
              <div class="detail">
                <h4>DAG TEMPERATUR</h4>
                <p>${temp.day}°c</p>
              </div>
              <div class="detail">
                <h4>NATT TEMPERATUR</h4>
                <p>${temp.night}°c</p>
              </div>
            </div>
          </div>
          <div class="details-moons">
            <h4>MÅNAR</h4>
            <p>${
              moons.length === 0
                ? ` ${name} har inga månar.`
                : planet.moons.join(", ")
            }</p>
          </div>
        </div>
        <div id="pagination-next">
          <button id="pagination-next-btn">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>`;
  document.querySelector(".planet-view").style.display = "flex";
  document.querySelector(".planets-view").style.display = "none";
  document.querySelector(".planet-view").innerHTML = markup;
  hidePaginationBtn();
  addHandlerPagination();
}
