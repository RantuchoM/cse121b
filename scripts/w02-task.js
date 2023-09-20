/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = "Martín Rantucho";
let currentYear = new Date().getFullYear();
let profilePicture = "images/Profile.jpg"



/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const year = document.querySelector('#year');
const imageElement = document.querySelector('img[alt="Placeholder Image"]');

nameElement.innerHTML = `<strong>${fullName}<\strong>`;

year.textContent = currentYear;
imageElement.setAttribute('src',profilePicture);
imageElement.setAttribute('alt',`Profile image of ${fullName}}`);

let favoriteFoods = ['Pizza','Pie','Ice cream','Salad'];
foodElement.innerHTML += `${favoriteFoods}`;

// adding new food
let newFood = 'Cheese';
favoriteFoods.push(newFood);
foodElement.innerHTML += `<br>${favoriteFoods}`;

// removing first
favoriteFoods.shift();
foodElement.innerHTML += `<br>${favoriteFoods}`;

// removing last
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;






/* Step 4 - Adding Content */






/* Step 5 - Array */






