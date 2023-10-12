/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
async function displayTemples(temples) {temples.forEach((temple) =>{
    const templeArticle = document.createElement("article");
    const templeName = document.createElement("h3")
    templeName.textContent = temple.templeName;
    
    const templeImage = document.createElement("img");
    templeImage.src = temple.imageUrl;
    templeImage.alt = temple.location;

    templeArticle.appendChild(templeName);
    templeArticle.appendChild(templeImage);
    templesElement.appendChild(templeArticle);

    });
}


/* async getTemples Function using fetch()*/
const getTemples = async() => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    if(response.ok){
        templeList = await response.json();
        console.log(templeList);
    }
    displayTemples(templeList);
}

/* reset Function */
const reset = () => {
    
    while (templesElement.firstChild) {
      templesElement.removeChild(templesElement.firstChild);
    }
  };

/* sortBy Function */
const sortBy = (temples) => {
    
    reset();
      
    const filter = document.querySelector("#sortBy").value;
      
    switch (filter) {
      case "utah":
        displayTemples(temples.filter((temple) => temple.location.includes("Utah")));
        break;
      case "notutah":
        displayTemples(temples.filter((temple) => !temple.location.includes("Utah")));
        break;
      case "older":
        displayTemples(temples.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0, 1)));
        break;
      case "all":
        displayTemples(temples);
        break;
      default:
        console.log("Invalid filter value");
    }
  };


getTemples();

/* Event Listener */

document.querySelector("#sortBy").addEventListener("change", () => { sortBy(templeList) });