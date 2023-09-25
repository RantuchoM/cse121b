/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add (number1, number2){
    return number1 + number2;
}
function addNumbers(){
    let add1 = Number(document.querySelector('#add1').value);
    let add2 = Number(document.querySelector('#add2').value);
    let addition = add(add1,add2);
    document.querySelector('#sum').value = addition;
    
}
document.querySelector('#addNumbers').addEventListener('click', addNumbers);
/* Function Expression - Subtract Numbers */
function substraction (number1, number2){
    return number1 - number2;
}
function substractNumbers(){
    let sub1 = Number(document.querySelector('#subtract1').value);
    let sub2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = substraction(sub1,sub2);
    
}
document.querySelector('#subtractNumbers').addEventListener('click', substractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (num1, num2) => num1 * num2;
const multiplyNumbers = () => {
    let fact1 = Number(document.querySelector('#factor1').value);
    let fact2 = Number(document.querySelector('#factor2').value);
    document.querySelector('#product').value = multiply(fact1,fact2);
};

document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);
/* Open Function Use - Divide Numbers */
const divide = (dividend,divisor) => dividend / divisor;
function divideNumbers(){
    let dividend = Number(document.querySelector('#dividend').value);
    let divisor = Number(document.querySelector('#divisor').value);
    document.querySelector('#quotient').value = divide(dividend,divisor);
}
document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);
/* Decision Structure */
const currentDate = new Date();
let fullYear = currentDate.getFullYear();
document.querySelector('#year').textContent = fullYear;

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13];
document.querySelector('#array').textContent = numberArray;
/* Output Odds Only Array */
document.querySelector('#odds').textContent = numberArray.filter(n => n%2 == 1);
/* Output Evens Only Array */
document.querySelector('#evens').textContent = numberArray.filter(n => n%2 == 0);
/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').innerHTML = numberArray.reduce((currentSum,number) => currentSum + number);
/* Output Multiplied by 2 Array */
document.querySelector('#multiplied').innerHTML = numberArray.map(n => n*2);
/* Output Sum of Multiplied by 2 Array */
document.querySelector('#sumOfMultiplied').innerHTML = numberArray.map(n => n*2).reduce((currentSum,number) => currentSum + number);