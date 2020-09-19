function myFetch(url = "https://restcountries.eu/rest/v2/all") {
  fetch(url, { mode: "cors" })
    .then((response) => response.json())
    .then((json) => {
      displayCountries(json);
      borderFun(json);
    });
}

myFetch();

const countries = document.querySelector(".countries");
const search = document.querySelector("#search");
const select = document.querySelector("#filter");

const countriesPage = document.querySelector(".coutries-page");
const detailsPage = document.querySelector(".details-page");

const goBack = document.querySelector(".go-back");

const allLeftP = document.querySelectorAll(".left span");
const allRightP = document.querySelectorAll(".right span");

const border = document.querySelector(".border");
const borderUl = document.querySelector(".border ul");

const countryName = document.querySelector(".country-name");

goBack.addEventListener("click", goBackFun);

function goBackFun() {
  countriesPage.classList.remove("hide");
  detailsPage.classList.add("hide");
}

function filterCountries(e) {
  if (e.target.value === "") {
    removeAllChildren(countries);
    myFetch();
  } else {
    removeAllChildren(countries);
    myFetch(`https://restcountries.eu/rest/v2/region/${e.target.value}`);
  }
}

function addClasses(tag, className) {
  tag.classList.add(className);
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displaySearch(e) {
  if (e.target.value === "") {
    removeAllChildren(countries);
    myFetch();
  } else {
    removeAllChildren(countries);
    myFetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`);
  }
}

function borderFun(data) {
  data.forEach((dat) => {
    dat.borders.forEach((border) => {
      data.forEach((redat) => {
        if (border === redat["alpha2Code"]) {
        } else {
        }
      });
    });
  });
}

function countryEvent(dat) {
  removeAllChildren(borderUl);
  const flagContainer = document.querySelector(".flag-container");
  const flagContainer2 = document.querySelector(".flag-container2");

  countriesPage.classList.add("hide");
  detailsPage.classList.remove("hide");
  countryName.textContent = dat.name;
  flagContainer2.src = `${dat.flag}`;
  allLeftP.forEach((leftP) => {
    if (leftP.classList.contains("native-name")) {
      leftP.textContent = dat.nativeName;
    } else if (leftP.classList.contains("population")) {
      leftP.textContent = dat.population;
    } else if (leftP.classList.contains("region")) {
      leftP.textContent = dat.region;
    } else if (leftP.classList.contains("sub-region")) {
      leftP.textContent = dat.subregion;
    } else if (leftP.classList.contains("capital")) {
      leftP.textContent = dat.capital;
    }
  });
  allRightP.forEach((rightP) => {
    if (rightP.classList.contains("top-level")) {
      rightP.textContent = dat.topLevelDomain[0] + " cfvgbj";
    } else if (rightP.classList.contains("currency")) {
      rightP.textContent = dat.currencies.map((curren) => curren.name);
    } else if (rightP.classList.contains("language")) {
      rightP.textContent = dat.languages.map((language) => language.name);
    }
  });

  if (dat.borders.length === 0) {
    const borderEl = document.createElement("p");
    borderEl.textContent = "None";
    borderEl.classList.add("border-country");
    borderUl.appendChild(borderEl);
  } else {
    dat.borders.forEach((borderli) => {
      const borderEl = document.createElement("li");
      let borderName = getCountryName(borderli);
      borderEl.textContent = borderName;
      borderUl.appendChild(borderEl);
    });
  }
}

function displayCountries(data) {
  data.forEach((dat) => {
    const country = document.createElement("div");
    addClasses(country, "country");

    country.addEventListener("click", () => countryEvent(dat));

    countries.appendChild(country);

    const flag = document.createElement("div");
    addClasses(flag, "flag");
    flag.style.backgroundImage = `url(${dat.flag})`;
    country.appendChild(flag);

    const detailsContainer = document.createElement("div");
    addClasses(detailsContainer, "details-container");
    country.appendChild(detailsContainer);

    const countryName = document.createElement("h3");
    countryName.textContent = dat.name;
    detailsContainer.appendChild(countryName);

    const details = document.createElement("div");
    addClasses(details, "datails");
    detailsContainer.appendChild(details);

    const pPopulation = document.createElement("p");
    pPopulation.textContent = "Population: ";
    const spanPopulation = document.createElement("span");
    addClasses(spanPopulation, "population");
    spanPopulation.textContent = dat.population;
    pPopulation.appendChild(spanPopulation);
    details.appendChild(pPopulation);

    const pRegion = document.createElement("p");
    pRegion.textContent = "Region: ";
    const spanRegion = document.createElement("span");
    addClasses(spanRegion, "region");
    spanRegion.textContent = dat.region;
    pRegion.appendChild(spanRegion);
    details.appendChild(pRegion);

    const pCapital = document.createElement("p");
    pCapital.textContent = "Capital: ";
    const spanCapital = document.createElement("span");
    addClasses(spanCapital, "capital");
    spanCapital.textContent = dat.capital;
    pCapital.appendChild(spanCapital);
    details.appendChild(pCapital);
  });
}

select.addEventListener("change", filterCountries);
search.addEventListener("input", displaySearch);
