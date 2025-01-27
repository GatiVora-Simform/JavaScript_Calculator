//to get the display input element
const display = document.getElementById("calc-display");

//to store memory value
let memory = 0;

let resultDisplayed = false;

let openParenthesesCount = 0;

function handleButtonClick(value) {

   const currentDisplay = display.value;

   const operators = ["+", "-", "*", "/", "%", "^"];

   if (operators.includes(value)) {
      //ovveride operator
      if (operators.includes(currentDisplay.slice(-1))) {
         display.value = currentDisplay.slice(0, -1) + value;
         return;
      }
   }

   if (value === "C") {
      display.value = "";
      return;
   }

   if (value === "⌫") {
      if (display.value === "Error") {
         display.value = "";
      } else {
         display.value = currentDisplay.slice(0, -1);
      }
      return;
   }

   if (value === "1/x") {
      if (currentDisplay) {
         let result = eval(currentDisplay);
         if (result !== 0) {
            display.value = (1 / result).toFixed(2);
         } else {
            alert("Error: Divide by 0");
            display.value = "";
         }
      } else {
         alert("Error: Input is empty");
         display.value = "";
      }
      return;
   }

   if (value === "x²") {
      if (currentDisplay) {
         display.value += "^2";
      } else {
         alert("Error: Input is empty");
         display.value = "";
      }
      return;
   }

   if (value === "√") {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += " * ";
      }
      display.value += "√(";
      openParenthesesCount++;
      return;
   }

   if (value === "mod") {
      if (currentDisplay !== "" && !isNaN(currentDisplay)) {
         display.value += "%";
      }
      return;
   }

   if (value === "log") {
      openParenthesesCount++;
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += " * ";
      }
      display.value += "log(";

      return;
   }

   if (value === "(") {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += " * ";
      }
      openParenthesesCount++;
      display.value += value;
      return;
   }

   if (value === ")") {
      if (openParenthesesCount > 0) {
         openParenthesesCount--;
         display.value += value;
      }
      return;
   }

   if (value === "π") {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += " * ";
      }
      if (currentDisplay.endsWith("π")) {
         display.value += " * ";
      }
      display.value += "π";
      return;
   }

   if (value === "e") {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += " * ";
      }
      if (currentDisplay.endsWith("e")) {
         display.value += " * ";
      }
      display.value += "e";
      return;
   }

   if (value === "M+") {
      memory += parseFloat(currentDisplay);
      display.value = "";
      return;
   }

   if (value === "M-") {
      memory -= parseFloat(currentDisplay);
      display.value = "";
      return;
   }

   if (value === "MS") {
      memory = parseFloat(currentDisplay);
      display.value = "";
      return;
   }

   if (value === "MR") {
      display.value = memory.toString();
      return;
   }

   if (value === "MC") {
      memory = 0;
      display.value = "";
      return;
   }

   if (value === "n!") {
      display.value = factorial(parseInt(currentDisplay));
      return;
   }

   if (value === "/") {
      console.log("oye")
      if (currentDisplay !== "") {
         display.value += "/";
      } else {
         alert("Error: Input is empty");
      }
      return;
   }

   if (value === "*") {
      console.log("oye")
      if (currentDisplay !== "") {
         display.value += "*";
      } else {
         alert("Error: Input is empty");
      }
      return;
   }

   if (value === "+") {
      console.log("oye")
      if (currentDisplay !== "") {
         display.value += "+";
      } else {
         alert("Error: Input is empty");
      }
      return;
   }
   if (value === "-") {
      console.log("oye")
      if (currentDisplay !== "") {
         display.value += "-";
      } else {
         alert("Error: Input is empty");
      }
      return;
   }


   if (value === "+/-") {
      if (currentDisplay && !isNaN(currentDisplay)) {
         display.value = parseFloat(currentDisplay) * -1;
      }
      return;
   }

   if (value === ".") {
      let lastNumber = currentDisplay.split(/[\+\-\*\/\(\) ]/).pop(); //last entered number
      if (lastNumber.includes(".")) {
         return;
      }
      display.value+=".";
   }

   //if last key was equals then if we press number it should clear prev
   if (resultDisplayed && !isNaN(value)) { 
      display.value = value;
      resultDisplayed = false;
      return;
   }

   if (!isNaN(value)) {
      if (currentDisplay.endsWith("π") || currentDisplay.endsWith("e")) {
         display.value += " * ";
      }
      display.value += value;
      return;
   }


}

function areParenthesesBalanced(expression) {
   let stack = [];

   for (let char of expression) {
      if (char === "(") {
         stack.push("(");
      } else if (char === ")") {
         if (stack.length === 0) {
            return false;
         }
         stack.pop();
      }
   }

   return stack.length === 0;
}

function calculateResult() {
   try {
      let expression = display.value;

      expression = expression.replace(/\^/g, "**");
      expression = expression.replace(/mod/g, "%");
      expression = expression.replace(/π/g, Math.PI.toFixed(2));
      expression = expression.replace(/e/g, Math.E.toFixed(2));
      expression = expression.replace(/log\(/g, "Math.log10(");
      expression = expression.replace(/√\(/g, "Math.sqrt(");

      if (expression.includes("/0")) {
         alert("Can't divide by zero!");
         display.value = "";
         return;
      }

      if (!areParenthesesBalanced(expression)) {
         alert("Error: Unmatched parentheses");
         return;
      }

      let result = eval(expression);

      if (!isNaN(result)) {
         if (typeof result === "number" && result % 1 !== 0) {
            display.value = result.toFixed(2);
         } else {
            display.value = result;
         }
      } else {
         display.value = "Error";
      }
   } catch (e) {
      display.value = "Error";
   }
}

function factorial(n) {
   if (n < 0) return "Error";
   if (n === 0 || n === 1) return 1;
   let result = 1;
   for (let i = 2; i <= n; i++) {
      result *= i;
   }
   return result;
}

//allow keyboard input
document.addEventListener("keydown", function (event) {

   display.focus();

   const key = event.key;

   const validKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      ".",
      "(",
      ")",
      "Enter",
      "Backspace",
   ];

   if (validKeys.includes(key)) {
      if (key >= "0" && key <= "9") {
         resultDisplayed=false;
         handleButtonClick(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
         resultDisplayed=false;
         handleButtonClick(key);
      } else if (key === "(" || key === ")") {
         resultDisplayed=false;
         handleButtonClick(key);
      } else if (key === "Enter") {
         resultDisplayed=true;
         calculateResult();
      } else if (key === "Backspace") {
         handleButtonClick("⌫");
      } else if (key === ".") {
         resultDisplayed=false;
         handleButtonClick(".");
      }
   } else {
      event.preventDefault();
   }
});

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
   button.addEventListener("click", function () {
      const value = button.innerText;
      if (value === "=") {
         calculateResult();
         resultDisplayed = true;
      } else {
         handleButtonClick(value);
         resultDisplayed = false;
      }
   });
});
