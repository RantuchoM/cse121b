/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Martín Rantucho",
    photo: "images/Profile2.jpg",
    favoriteFoods: ["meat","salad","pizza","ice cream","cheese"],
    hobbies: ["reading","walking","listening to music"],
    placesLived: []
};



/* Populate Profile Object with placesLive objects */

myProfile.placesLived.push(
    {
        place: "Bahía Blanca",
        length: "18 years"
    }
)
myProfile.placesLived.push(
    {
        place: "Buenos Aires",
        length: "7 años"
    }
)
myProfile.placesLived.push(
    {
        place: "Bahía Blanca 2",
        length: "6 years"
    }
)
myProfile.placesLived.push(
    {
        place: "Viedma",
        length: "2 years"
    }
)


/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").textContent = myProfile.name;
/* Photo with attributes */
document.querySelector("#photo").setAttribute("src",myProfile.photo);
document.querySelector("#photo").setAttribute("alt",myProfile.name);
/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let element = document.createElement("li");
    element.textContent = food;
    document.querySelector("#favorite-foods").appendChild(element)
})

/* Hobbies List */
let list = document.createElement("ul");  //I had to create this list, in order for the bullets to appear
myProfile.hobbies.forEach(hobby => {
    let listItem = document.createElement("li");
    listItem.textContent = hobby;
    list.appendChild(listItem); 
});
document.querySelector("#hobbies").appendChild(list);

/* Places Lived DataList */


myProfile.placesLived.forEach(placeLived => {
    let dt = document.createElement("dt");
    
    let bulletImg = document.createElement("img");
        bulletImg.src = "images/bullet.png"; // Set the source to your bullet image URL
        bulletImg.alt = "Bullet"; // Set an alt attribute for accessibility
        bulletImg.style.marginRight = "5px"; // Adjust margin for spacing
        bulletImg.style.width = "20px";
        bulletImg.style.height = "20px";
    dt.appendChild(bulletImg);

    let strong = document.createElement("strong");
    strong.textContent = placeLived.place;
    dt.appendChild(strong);

    let dl = document.createElement("dl");
    dl.textContent = placeLived.length;
    dl.style.marginLeft = "40px"; // Adjust the left margin to increase indentation
    dl.style.fontSize = "smaller"; // Make the text size smaller

    let space = document.createElement("br");
    
    
    document.querySelector("#places-lived").appendChild(dt);
    document.querySelector("#places-lived").appendChild(dl);
    document.querySelector("#places-lived").appendChild(space);
})

