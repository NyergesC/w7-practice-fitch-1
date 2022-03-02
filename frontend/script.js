function Country(name, short, population, flag, continent) {
    this.name = name;
    this.short = short;
    this.population = population;
    this.flag = flag;
    this.continent = continent;
}

//components - view with menu

const menuButton = () =>{
    return`
    <button id="menubtn">
        <svg width="40" height=40>
            <rect width="20" height="2"/>
            <rect width="20" height="2"/>
            <rect width="20" height="2"/>
        </svg>
        <span>button</span>
    </button>
    `;
};

const header = (logo, button) => {
    return `
    <header>
        <a id="id">${logo}</a>
        {${button()}
    </header>
    `
}

const countryCard = (name, short, population,flag, continent) => {
    return `
    <div>
        <h1>${name}</h1>
        <p>${population}</p>
        <p>${short}</p>
        <p>${population}</p>
        <img src="${flag}"></img>
        <p>${continent}</p>
    </div>
    `
};


//menubutton componens



const loadEvent = async _ => { //async jelzi h a load esemenyen belul meg kell varni a betoltodeseket
    //GET DATA
    
    const countryRes = await fetch("https://restcountries.com/v3.1/all"); // await-el megvarjuk a letoltodest, azert ketszer mert elobb a fetch-et varja meg , aztan a country array megvarja h a res toltson be
    const countryArr = await countryRes.json();

    //PROCESS DATA
    let countries = countryArr.map(function (country) {

        return new Country(country.name.common, country.cca3, country.population, country.flags.svg, country.continents[0])

    })
    console.log(countries)

    const rootElement = document.getElementById("root");

    rootElement.insertAdjacentHTML("beforeend", header("countries", menuButton))


//--------BIG TEST BROTHER------//


    let content = "";

    for (const country of countries) {
        content += countryCard(country.name, country.short, country.population, country.flag, country.continent)
    }

    rootElement.insertAdjacentHTML("beforeend", content) 

    const menubtn = document.getElementById("menubtn")
    menubtn.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("clicked")
    });
}
window.addEventListener("load", loadEvent);