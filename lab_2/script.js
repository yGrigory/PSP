const resultNode = document.getElementById("result");

let firstOperand = "";
let secondOperand = "";
let operation = null;
let shouldResetSecond = false;

function updateDisplay(value) {
  resultNode.textContent = value || "0";
}

function appendDigit(digit) {
  if (operation === null) {
    firstOperand = appendToNumber(firstOperand, digit);
    updateDisplay(firstOperand);
    return;
  }

  if (shouldResetSecond) {
    secondOperand = "";
    shouldResetSecond = false;
  }

  secondOperand = appendToNumber(secondOperand, digit);
  updateDisplay(secondOperand);
}

function appendToNumber(current, char) {
  if (char === "." && current.includes(".")) {
    return current;
  }

  if (current === "0" && char !== ".") {
    return char;
  }

  if (current === "" && char === ".") {
    return "0.";
  }

  return current + char;
}

function setOperation(nextOperation) {
  if (firstOperand === "") {
    firstOperand = "0";
  }

  if (operation !== null && secondOperand !== "") {
    calculate();
  }

  operation = nextOperation;
  shouldResetSecond = true;
}

function calculate() {
  if (operation === null || secondOperand === "") {
    return;
  }

  const a = Number(firstOperand);
  const b = Number(secondOperand);
  let computed = 0;

  if (operation === "+") {
    computed = a + b;
  } else if (operation === "-") {
    computed = a - b;
  } else if (operation === "x") {
    computed = a * b;
  } else if (operation === "/") {
    computed = b === 0 ? NaN : a / b;
  }

  if (!Number.isFinite(computed)) {
    clearAll();
    updateDisplay("Ошибка");
    return;
  }

  firstOperand = String(computed);
  secondOperand = "";
  operation = null;
  shouldResetSecond = false;
  updateDisplay(firstOperand);
}

function clearAll() {
  firstOperand = "";
  secondOperand = "";
  operation = null;
  shouldResetSecond = false;
  updateDisplay("0");
}

function toggleSign() {
  if (operation === null) {
    if (firstOperand === "" || firstOperand === "0") {
      return;
    }
    firstOperand = String(Number(firstOperand) * -1);
    updateDisplay(firstOperand);
    return;
  }

  if (secondOperand === "" || secondOperand === "0") {
    return;
  }

  secondOperand = String(Number(secondOperand) * -1);
  updateDisplay(secondOperand);
}

function percent() {
  if (operation === null) {
    if (firstOperand === "") {
      return;
    }
    firstOperand = String(Number(firstOperand) / 100);
    updateDisplay(firstOperand);
    return;
  }

  if (secondOperand === "") {
    return;
  }

  secondOperand = String(Number(secondOperand) / 100);
  updateDisplay(secondOperand);
}

for (let digit = 0; digit <= 9; digit += 1) {
  document.getElementById(`btn_digit_${digit}`).onclick = () => appendDigit(String(digit));
}

document.getElementById("btn_digit_dot").onclick = () => appendDigit(".");

document.getElementById("btn_op_plus").onclick = () => setOperation("+");
document.getElementById("btn_op_minus").onclick = () => setOperation("-");
document.getElementById("btn_op_mult").onclick = () => setOperation("x");
document.getElementById("btn_op_div").onclick = () => setOperation("/");
document.getElementById("btn_op_equal").onclick = () => calculate();
document.getElementById("btn_op_clear").onclick = () => clearAll();
document.getElementById("btn_op_sign").onclick = () => toggleSign();
document.getElementById("btn_op_percent").onclick = () => percent();
