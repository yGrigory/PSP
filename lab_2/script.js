const resultNode = document.getElementById("result");
const memoryNode = document.getElementById("memory");
const calculatorNode = document.getElementById("calculator");
const calcWrapNode = document.getElementById("calc_wrap");
const toggleCalcBtn = document.getElementById("btn_show_calc");
const fioBtn = document.getElementById("btn_show_fio");
const fioInfoNode = document.getElementById("fio_info");

let firstOperand = "";
let secondOperand = "";
let operation = null;
let shouldResetSecond = false;
let memoryValue = 0;

const calcBackgrounds = ["#222", "#1d3557", "#1f3b2d", "#5a2a27"];
const resultColors = ["#ffffff", "#ffe08a", "#a8ffb0", "#a8d5ff"];
let bgIndex = 0;
let textIndex = 0;

function updateDisplay(value) {
  resultNode.textContent = value || "0";
}

function updateMemory() {
  memoryNode.textContent = `M: ${formatNumber(memoryValue)}`;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "Ошибка";
  }
  return String(Number.parseFloat(value.toFixed(10)));
}

function isEditingSecond() {
  return operation !== null && !shouldResetSecond;
}

function getCurrentValue() {
  if (isEditingSecond()) {
    return secondOperand;
  }
  return firstOperand;
}

function setCurrentValue(value) {
  if (isEditingSecond()) {
    secondOperand = value;
    updateDisplay(secondOperand || "0");
    return;
  }

  firstOperand = value;
  updateDisplay(firstOperand || "0");
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

function clearAll() {
  firstOperand = "";
  secondOperand = "";
  operation = null;
  shouldResetSecond = false;
  updateDisplay("0");
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

  firstOperand = formatNumber(computed);
  secondOperand = "";
  operation = null;
  shouldResetSecond = false;
  updateDisplay(firstOperand);
}

function applyUnary(fn) {
  const current = getCurrentValue();
  if (current === "") {
    return;
  }

  const result = fn(Number(current));
  if (!Number.isFinite(result)) {
    clearAll();
    updateDisplay("Ошибка");
    return;
  }

  setCurrentValue(formatNumber(result));
}

function toggleSign() {
  applyUnary((value) => (value === 0 ? 0 : value * -1));
}

function percent() {
  applyUnary((value) => value / 100);
}

function square() {
  applyUnary((value) => value * value);
}

function cube() {
  applyUnary((value) => value * value * value);
}

function sqrt() {
  applyUnary((value) => (value < 0 ? NaN : Math.sqrt(value)));
}

function factorial() {
  applyUnary((value) => {
    if (!Number.isInteger(value) || value < 0 || value > 170) {
      return NaN;
    }
    let result = 1;
    for (let i = 2; i <= value; i += 1) {
      result *= i;
    }
    return result;
  });
}

function backspace() {
  const current = getCurrentValue();
  if (current === "") {
    return;
  }

  const next = current.slice(0, -1);
  setCurrentValue(next === "" || next === "-" ? "" : next);
}

function addTripleZero() {
  appendDigit("0");
  appendDigit("0");
  appendDigit("0");
}

function memoryPlus() {
  memoryValue += Number(getCurrentValue() || "0");
  updateMemory();
}

function memoryMinus() {
  memoryValue -= Number(getCurrentValue() || "0");
  updateMemory();
}

function toggleBackground() {
  bgIndex = (bgIndex + 1) % calcBackgrounds.length;
  calculatorNode.style.backgroundColor = calcBackgrounds[bgIndex];
}

function toggleResultColor() {
  textIndex = (textIndex + 1) % resultColors.length;
  resultNode.style.color = resultColors[textIndex];
}

function resetTheme() {
  bgIndex = 0;
  textIndex = 0;
  calculatorNode.style.backgroundColor = calcBackgrounds[0];
  resultNode.style.color = resultColors[0];
}

for (let digit = 0; digit <= 9; digit += 1) {
  document.getElementById(`btn_digit_${digit}`).onclick = () => appendDigit(String(digit));
}

document.getElementById("btn_digit_dot").onclick = () => appendDigit(".");
document.getElementById("btn_digit_000").onclick = () => addTripleZero();

document.getElementById("btn_op_plus").onclick = () => setOperation("+");
document.getElementById("btn_op_minus").onclick = () => setOperation("-");
document.getElementById("btn_op_mult").onclick = () => setOperation("x");
document.getElementById("btn_op_div").onclick = () => setOperation("/");
document.getElementById("btn_op_equal").onclick = () => calculate();
document.getElementById("btn_op_clear").onclick = () => clearAll();
document.getElementById("btn_op_sign").onclick = () => toggleSign();
document.getElementById("btn_op_percent").onclick = () => percent();
document.getElementById("btn_op_backspace").onclick = () => backspace();
document.getElementById("btn_op_sqrt").onclick = () => sqrt();
document.getElementById("btn_op_square").onclick = () => square();
document.getElementById("btn_op_cube").onclick = () => cube();
document.getElementById("btn_op_factorial").onclick = () => factorial();
document.getElementById("btn_op_mem_plus").onclick = () => memoryPlus();
document.getElementById("btn_op_mem_minus").onclick = () => memoryMinus();
document.getElementById("btn_ui_bg").onclick = () => toggleBackground();
document.getElementById("btn_ui_text").onclick = () => toggleResultColor();
document.getElementById("btn_ui_reset").onclick = () => resetTheme();

if (toggleCalcBtn && calcWrapNode) {
  toggleCalcBtn.onclick = () => {
    const hidden = calcWrapNode.classList.toggle("is-hidden");
    toggleCalcBtn.textContent = hidden ? "Калькулятор" : "Скрыть калькулятор";
  };
}

if (fioBtn && fioInfoNode) {
  fioBtn.onclick = () => {
    const hidden = fioInfoNode.classList.toggle("is-hidden");
    fioBtn.textContent = hidden ? "ФИО" : "Скрыть ФИО";
  };
}

document.querySelectorAll(".js-clickable").forEach((node) => {
  node.addEventListener("click", (event) => {
    event.preventDefault();
    const message = node.dataset.message || "Кнопка нажата";
    alert(message);
  });
});

updateMemory();
updateDisplay("0");
