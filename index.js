// Get the display input element
const display = document.getElementById('calc-display');

// Variables to store memory values (like M+, M-, MS)
let memory = 0;

let resultDisplayed = false;

let openParenthesesCount = 0;

function handleButtonClick(value) {
   const currentDisplay = display.value;


   if (resultDisplayed && !isNaN(value)) {
      display.value = value;
      resultDisplayed = false; // Reset the flag
      return;
   }


   const operators = ['+', '-', '*', '/', '%', '^', '÷'];
   if (operators.includes(value)) {
      // If last value is also an operator, replace it
      if (operators.includes(currentDisplay.slice(-1))) {
         display.value = currentDisplay.slice(0, -1) + value;
         return;
      }
   }

   if (value === 'C') {
      display.value = '';
      resultDisplayed = false;
      return;
   }

   if (value === '⌫') {
      if (display.value === 'Error') {
         display.value = '';
      } else {
         display.value = currentDisplay.slice(0, -1);
      }
      resultDisplayed = false;
      return;
   }

   if (value === '1/x') {
      if (currentDisplay !== '' && !isNaN(currentDisplay)) {
         display.value = (1 / parseFloat(currentDisplay)).toString();
      } else {
         display.value = 'Error';
      }
      return;
   }


   if (value === 'x²') {
      if (currentDisplay !== '') {
         display.value += '^2';

      }
      return;
   }

   if (value === '√') {
      display.value = Math.sqrt(parseFloat(currentDisplay)).toString();
      return;
   }


   if (value === 'mod') {
      if (currentDisplay !== '' && !isNaN(currentDisplay)) {
         display.value += '%';
      }
      return;
   }


   if (value === 'log') {
      display.value += 'log(';
      return;
   }


   if (value === '(') {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += ' * ';
      }
      openParenthesesCount++;
      display.value += value;
      return;
   }

   if (value === ')') {
      if (openParenthesesCount > 0) {
         openParenthesesCount--;
         display.value += value;
      }
      return;
   }


   if (value === 'π') {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += ' * ';
      }
      if (currentDisplay.endsWith('π')) {
         display.value += ' * ';
      }
      display.value += 'π';
      return;
   }

   if (value === 'e') {
      if (currentDisplay && /[\d\)]$/.test(currentDisplay)) {
         display.value += ' * ';
      }
      if (currentDisplay.endsWith('e')) {
         display.value += ' * ';
      }
      display.value += 'e';
      return;
   }

   if (value === 'M+') {
      memory += parseFloat(currentDisplay);
      display.value = '';
      return;
   }

   if (value === 'M-') {
      memory -= parseFloat(currentDisplay);
      display.value = '';
      return;
   }

   if (value === 'MS') {
      memory = parseFloat(currentDisplay);
      display.value = '';
      return;
   }

   if (value === 'MR') {
      display.value = memory.toString();
      return;
   }

   if (value === 'MC') {
      memory = 0;
      display.value = '';
      return;
   }

   if (value === 'n!') {
      display.value = factorial(parseInt(currentDisplay)).toString();
      return;
   }

   if (value === '÷') {
      value = '/';
   }
   if (value === '+/-') {
      if (currentDisplay !== '' && !isNaN(currentDisplay)) {
         display.value = (parseFloat(currentDisplay) * -1).toString(); // Toggle the sign
      }
      return;
   }

   if (value === '.') {

      if (currentDisplay.includes('.')) {
         return;
      }
   }

   display.value += value;
}

function isFloatingPoint(num) {
   return !Number.isInteger(num);
}


// Helper function to check if parentheses are balanced
function areParenthesesBalanced(expression) {
   let stack = [];

   for (let char of expression) {
      if (char === '(') {
         stack.push('(');
      } else if (char === ')') {
         if (stack.length === 0) {
            return false; // More closing parentheses than opening ones
         }
         stack.pop();
      }
   }

   // If there are any unmatched opening parentheses, return false
   return stack.length === 0;
}

function calculateResult() {
   try {
      // Get the current display value
      let expression = display.value;

      expression = expression.replace(/\^/g, '**');
      expression = expression.replace(/mod/g, '%');
      expression = expression.replace(/π/g, Math.PI);
      expression = expression.replace(/e/g, Math.E);
      expression = expression.replace(/log\(/g, 'Math.log10(');

      if (expression.includes('/0')) {
         alert("Can't divide by zero!");
         display.value = '';
         return;
      }

      // First, validate parentheses balance
      if (!areParenthesesBalanced(expression)) {
         alert("Error: Unmatched parentheses")
         display.value = '';
         return;
      }

      let result = eval(expression);




      if (!isNaN(result)) {
         if (isFloatingPoint(result.value)) {
            display.value = result.toFixed(2);
         }
         display.value = result;

      } else {
         display.value = 'Error';
      }
   } catch (e) {
      display.value = 'Error';
   }
}


function factorial(n) {
   if (n < 0) return 'Error';
   if (n === 0 || n === 1) return 1;
   let result = 1;
   for (let i = 2; i <= n; i++) {
      result *= i;
   }
   return result;
}

// Keyboard input handling
document.addEventListener('keydown', function (event) {
   const key = event.key;

   // Allow only numeric keys, operators, and some special keys
   const validKeys = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '+', '-', '*', '/',
      '.',
      '(', ')',
      'Enter', 'Backspace'
   ];

   if (validKeys.includes(key)) {
      if (key >= '0' && key <= '9') {
         handleButtonClick(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
         handleButtonClick(key);
      } else if (key === 'Enter') {
         calculateResult();
      } else if (key === 'Backspace') {
         handleButtonClick('⌫');
      } else if (key === '.') {
         handleButtonClick('.');
      }
   } else {
      event.preventDefault();
   }

});

// Add the ability to click buttons with mouse
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
   button.addEventListener('click', function () {
      const value = button.innerText;
      if (value === '=') {
         calculateResult();
         resultDisplayed = true;
      } else {
         handleButtonClick(value);
         resultDisplayed = false;
      }
   });
});
