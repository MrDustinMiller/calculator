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
  display.value = "";
  operatorClicked = false;
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
  result = numOne + numTwo;
};

let subtraction = (numOne, numTwo) => {
  result = numOne - numTwo;
};

let multiplication = (numOne, numTwo) => {
  result = numOne * numTwo;
  //   let nums = Array.from(array);
  //   let result = nums.reduce((accumulator, nextItem) => accumulator * nextItem);
  //   console.log(array);
  //   display.value = result;
};

let division = (numOne, numTwo) => {
  result = numOne / numTwo;
};

let operate = (operator, numOne, numTwo) => {
  switch (operator) {
    case "+":
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
      break;
  }
};

function test() {
  //make sure we have to numbers to do an expression with
  if (numOne && numTwo > 0) {
    operate(operator, numOne, numTwo);
  }
}

numbers.forEach((element) => {
  element.addEventListener("click", (e) => {
    display.value += e.target.value;

    if (operatorClicked != true) {
      numOne += Number(e.target.value);
    }

    //if operatorClicked = true then add the inputted values to our second num, not the first.
    if (numOne > 0 && operatorClicked != false) {
      numTwo += Number(e.target.value);
      display.value = numOne + `${operator}` + numTwo;
    }

    //divide by zero error message
    if (operatorClicked != false && operator === "/" && numTwo === 0) {
      display.value = numOne + `${operator}`;
      alert("You can't divide by 0 silly");
    }

    test();
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
    //no operator had been clicked yet, only equals or decimal has
    if (e.target.value === "=" || e.target.value === ".") {
      operatorClicked === false;
    } else if ((operatorClicked = true)) {
      //has to be an operator clicked if its not "="/".". set operatorClicked to TRUE
      operator = e.target.value;
      display.value += `${operator}`;
    }

    //display error msg if user clicks a operand and operator but no second operand.
    //extra operator != condition so we can differeniate between equal message and
    //divide by zero message.
    if (e.target.value === "=" && numTwo === 0 && operator != "/") {
      alert(
        "Please select operation and a second number before hitting equals"
      );
    }

    //if numTwo is equal to 0 then we have no final equation to display
    if (e.target.value === "=" && operatorClicked != false && numTwo != 0) {
      display.value =
        numOne + " " + `${operator}` + " " + numTwo + " " + "=" + " " + result;
    }
  });
});
