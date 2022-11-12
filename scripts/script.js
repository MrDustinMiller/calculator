let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".num");
let operations = document.querySelectorAll(".operations");
let deleteBtns = document.querySelectorAll(".delete-buttons");
let operatorClicked = false;
let operator;
let numOne = 0;
let numTwo = 0;
let result = 0;

let clearScreen = () => {
  //issue with clearing data. its setting and keeping numone and numtwo at 0
  //not updating when its clicked next
  display.value = "";
  numOne = 0;
  numTwo = 0;
  result = 0;
  operator = "";
};

let backSpace = () => {
  let array = Array.from(display.value);
  array.pop();

  let output = array.join("");
  display.value = output.toString();

  if (array.length === 0) {
    display.value = "";
  }
};

let addition = (numOne, numTwo) => {
  result = Number(numOne) + Number(numTwo);
};

let subtraction = (numOne, numTwo) => {
  result = Number(numOne) - Number(numTwo);
};

let multiplication = (array) => {
  //   let nums = Array.from(array);
  //   let result = nums.reduce((accumulator, nextItem) => accumulator * nextItem);
  //   console.log(array);
  //   display.value = result;
};

let division = () => {};

let operate = (operator, numOne, numTwo) => {
  switch (operator) {
    case "+":
      console.log(operator, numOne, numTwo);
      addition(numOne, numTwo);
      break;
    case "-":
      subtraction(numOne, numTwo);
      break;
    case "*":
      multiplication(numOne, numTwo);
      break;
    case "/":
      division(numOne, numTwo);
      break;

    default:
      alert("No valid operator selected.");
      break;
  }
};

function test() {
  console.log(numOne, numTwo);
  if (numOne && numTwo > 0) {
    operate(operator, numOne, numTwo);
  }
}

numbers.forEach((element) => {
  element.addEventListener("click", (e) => {
    display.value += e.target.value; //plus operation

    if (operatorClicked != true) {
      numOne += e.target.value; //issue with zerores being in front
    }

    if (numOne > 0 && operatorClicked != false) {
      display.value = numOne + `${operator}`;
      numTwo += e.target.value;
      display.value = numOne + `${operator}` + numTwo;
    }

    test();
    //console.log(e.target.value);
  });
});

deleteBtns.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.innerHTML === "CLEAR") {
      clearScreen();
    } else if (e.target.innerHTML == "BACKSPACE") {
      backSpace();
    }
  });
});

operations.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.value === "=" || e.target.value === ".") {
      operatorClicked === false;
    } else operatorClicked = true;

    if (e.target.value === "=" && operatorClicked != false) {
      display.value =
        numOne + " " + `${operator}` + " " + numTwo + " " + "=" + " " + result;
    }
    operator = e.target.value;

    //console.log(operator);
  });
});
