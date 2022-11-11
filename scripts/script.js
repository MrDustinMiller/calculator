let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".numbers");
let operations = document.querySelectorAll(".operations");
let deleteBtns = document.querySelectorAll(".delete-buttons");
let operation;

let clearScreen = () => {
  display.value = "";
};

let backSpace = () => {
  //problem here with the dislplay value not updating
  //literally dont think ive gotten there yet tho
  let array = Array.from(display.value);

  array.pop();

  //fix this, convert from array w/no commas or nething
  display.value = array.toString();

  if (array.length === 0) {
    display.value = "";
  }
  console.log(array);
  return array;
};

let addition = (numOne, numTwo) => {
  return numOne + numTwo;
};

let subtraction = (numOne, numTwo) => {
  return numOne - numTwo;
};

let multiplication = (array) => {
  return array.reduce((accumulator, nextItem) => accumulator * nextItem);
};

let division = () => {};

let operate = () => {
  //switch/case
};

numbers.forEach((element) => {
  element.addEventListener("click", (e) => {
    display.value += e.target.value; //plus operation
    console.log(e.target.value);
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
    operation = e.target.value; //???
  });
});
