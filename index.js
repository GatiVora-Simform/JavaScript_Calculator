// Get the display input element
const display = document.getElementById('calc-display');

// Variables to store memory values (like M+, M-, MS)
let memory = 0;

function handleButtonClick(value) {
   const currentDisplay = display.value;


   if (value === 'C') {
      display.value = '';
      return;
   }

   if (value === '⌫') {
      if (display.value === 'Error') {
         display.value = ''; // Clear input if error message is displayed
      } else {
         display.value = currentDisplay.slice(0, -1); // Remove last character otherwise
      }
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

   if (value === ')') {
      display.value += ')';
      return;
   }

   if (value === 'π') {
      display.value += 'π';
      return;
   }

   if (value === 'e') {
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

   display.value += value;
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


      let result = eval(expression);

      // If the result is a valid number, format it to 4 decimal places
      if (!isNaN(result)) {
         display.value = result.toFixed(4);
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
});

// Add the ability to click buttons with mouse
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
   button.addEventListener('click', function () {
      const value = button.innerText;
      if (value === '=') {
         calculateResult();
      } else {
         handleButtonClick(value);
      }
   });
});
