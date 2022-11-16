let display = document.querySelector(".display");
let numbers = document.querySelectorAll(".num");
let operations = document.querySelectorAll(".operations");
let deleteBtns = document.querySelectorAll(".delete-buttons");
let equals = document.querySelector(".equals");
let operatorClicked = false;
let equalClicked = false;
let continuedOperation = false;
let operator;
let numberOne;
let numberTwo;
let result;
let array = new Array;

  let clearScreen = () => {
    display.value = "";
    operatorClicked = false;
    equalClicked = false;
    continuedOperation = false;
    numberTwo = 0;
    numberOne = 0;
    result = undefined;
    operator = ""
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
    display.value += " " + "=" + " " + result;
      if (continuedOperation === true) {
          display.value = result;
        clearValuesOnChainedEquation();
      }
    array = [];
  };
  
  let subtraction = (numOne, numTwo) => {
    result = numOne - numTwo;
    display.value += " " + "=" + " " + result;
    if (continuedOperation === true) {
        display.value = result;
        clearValuesOnChainedEquation();
    }
    array = [];
  };
  
  let multiplication = (numOne, numTwo) => {
    result = numOne * numTwo;
    display.value += " " + "=" + " " + result;
    if (continuedOperation === true) {
        display.value = result;
        clearValuesOnChainedEquation();
    }
    array = [];
  };
  
  let division = (numOne, numTwo) => {
    result = numOne / numTwo;
    display.value += " " + "=" + " " + result;
    if (continuedOperation === true) {
        display.value = result;
        clearValuesOnChainedEquation();
    }
    array = [];
  };
  
  let operate = (operator, numOne, numTwo) => {
    if (numOne !== 0 && numTwo !== 0) {
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
  
      default :
        break;
    }
    } else return;
    
  };

  let displayValues = (e) => { 
    let newOperand;   

    //for continued equations
    if (result !== undefined && operator !== undefined) {
        //push each target value to an array
        array.push(e.target.value);
        newOperand = array.join("");
        //once values are joined together this will be our new operand
        display.value =  result + `${operator}` + newOperand;
    } 

    //for the first equation
    if (continuedOperation === false) {
         display.value += e.target.value;
    } 
  }

  let clearValuesOnChainedEquation = () => {
    if (continuedOperation === true && equalClicked === true) {
        numberOne = 0;
        numberTwo = 0;
    }
  }

  let checkForNextClick = (numOne, numTwo) => {
    //any operation with equals clicked to get result
    if (equalClicked === true) {
        operate(operator, numOne, numTwo)
    } 

    //any operation with continued operator clicked to get result
    if (continuedOperation === true) {
        operate(operator, numOne, numTwo)
    }
  }

  let getFirstNum = () => { 
    numberOne = Number(display.value);    
  }

 let getSecondNum = () => {     
    let test = Array.from(display.value)
    let index = test.indexOf(operator)
    let numTwoArray = test.splice(index+1)
    //join the array together to have our numTwo
    numberTwo = numTwoArray.join("")
    numberTwo = Number(numberTwo)   
 }

 let checkForFullEquation = (e) => {
    //error msg
    if (e.target.value === "=" && numberTwo === 0 && operator != "/" && operator != "*") {
        alert(
          "Please select a operation and a second number before hitting equals"
        );
      } else if (e.target.value = "*" && numberTwo === 0) {
        display.value = 0;
      }
 }

let checkForDivideByZero = () => {
    //divide by zero error message
    if (operatorClicked != false && operator === "/" && numberTwo === 0) {
        alert("You can't divide by 0 silly");
        if (result === undefined) {
            //for first equation
            display.value = numberOne + `${operator}`;
            //for any equation after
        } else display.value = result + `${operator}`;
      }
}

let checkForContinuedOperation = (result, newOperand) => {
  //any equation after the first one
   if (continuedOperation === true) {
        checkForNextClick(result, newOperand)
    } 
    
   //this would be the first pass through an equation by clicking another operator as opposed to equals "="
    if (numberOne !== undefined && numberTwo !== undefined && operator !== undefined && result === undefined) {
        if (numberTwo === 0) {
            display.value = numberOne + `${operator}`
        } else if (numberTwo !== 0 ) {
             continuedOperation = true;
            checkForNextClick(numberOne, numberTwo)
        } 
    }
};
 
 //start with an empty calculator screen on page load
 clearScreen();

  numbers.forEach((element) => {
    element.addEventListener("click", (e) => {
      displayValues(e);  
      if (operatorClicked !== true) {
        getFirstNum();
      } else getSecondNum();

      checkForDivideByZero();
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

  equals.addEventListener("click", (e) => {
    checkForFullEquation(e);
    equalClicked = true;
    
    //first equation
    if (result === undefined) {
        checkForNextClick(numberOne, numberTwo)
        //any equation after
    } else checkForNextClick(result,numberTwo);

  })

  operations.forEach((element) => {
    element.addEventListener("click", (e) => {
    operator = e.target.value;   

    //this will stop being able to input multiple operators on chained equations
    if (numberOne === 0 && numberTwo === 0 && continuedOperation === true) {
        display.value = result + `${operator}`;
    }else display.value += `${operator}`;

    operatorClicked = true; 

    if (continuedOperation === false) {
        checkForContinuedOperation();
    } else checkForNextClick(result,numberTwo)   
    });
  });