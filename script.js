const resultNode = document.getElementById("result");
const memoryNode = document.getElementById("memory");
const calculatorNode = document.getElementById("calculator");
const calcWrapNode = document.getElementById("calc_wrap");
const toggleCalcBtn = document.getElementById("btn_show_calc");
const fioBtn = document.getElementById("btn_show_fio");
const fioInfoNode = document.getElementById("fio_info");
const toggleHistoryBtn = document.getElementById("btn_toggle_history");
const clearHistoryBtn = document.getElementById("btn_clear_history");
const historyPanelNode = document.getElementById("history_panel");
const historyListNode = document.getElementById("history_list");

let firstOperand = "";
let secondOperand = "";
let operation = null;
let shouldResetSecond = false;
let memoryValue = 0;
const historyItems = [];

const calcBackgrounds = [
  "linear-gradient(165deg, #0a3f77, #052e5f)",
  "linear-gradient(165deg, #0e4d87, #083768)",
  "linear-gradient(165deg, #0f5b7f, #0a3f77)",
  "linear-gradient(165deg, #19506f, #0f3558)"
];
const resultColors = ["#0c2239", "#0a3f77", "#14548f", "#1d2d44"];
let bgIndex = 0;
let textIndex = 0;

function updateDisplay(value) {
  resultNode.textContent = value || "0";
}

function updateMemory() {
  memoryNode.textContent = `M: ${formatNumber(memoryValue)}`;
}

function renderHistory() {
  if (!historyListNode) {
    return;
  }

  historyListNode.innerHTML = "";
  if (historyItems.length === 0) {
    const li = document.createElement("li");
    li.textContent = "История пуста";
    historyListNode.appendChild(li);
    return;
  }

  historyItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyListNode.appendChild(li);
  });
}

function addHistory(entry) {
  historyItems.unshift(entry);
  if (historyItems.length > 20) {
    historyItems.pop();
  }
  renderHistory();
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

function getDisplayedNumber() {
  const rawText = (resultNode.textContent || "").trim().replace(",", ".");
  const displayed = Number(rawText);
  if (!Number.isFinite(displayed)) {
    return null;
  }
  return displayed;
}

function appendToNumber(current, char) {
  if (current === "-" && char === ".") {
    return "-0.";
  }
  if (current === "-") {
    return `-${char}`;
  }
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
  if (nextOperation === "-" && operation === null && firstOperand === "") {
    firstOperand = "-";
    updateDisplay(firstOperand);
    return;
  }

  if (nextOperation === "-" && operation !== null && (shouldResetSecond || secondOperand === "")) {
    secondOperand = "-";
    shouldResetSecond = false;
    updateDisplay(secondOperand);
    return;
  }

  if (firstOperand === "") {
    firstOperand = "0";
  }

  if (operation !== null && secondOperand !== "" && secondOperand !== "-") {
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
  if (firstOperand === "-" || operation === null || secondOperand === "" || secondOperand === "-") {
    return;
  }

  const aText = firstOperand;
  const bText = secondOperand;
  const opSymbol = operation;
  const a = Number(aText);
  const b = Number(bText);
  let computed = 0;

  if (opSymbol === "+") {
    computed = a + b;
  } else if (opSymbol === "-") {
    computed = a - b;
  } else if (opSymbol === "x") {
    computed = a * b;
  } else if (opSymbol === "/") {
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
  addHistory(`${aText} ${opSymbol} ${bText} = ${firstOperand}`);
}

function applyUnary(fn, label) {
  const current = getCurrentValue();
  if (current === "" || current === "-") {
    return;
  }

  const result = fn(Number(current));
  if (!Number.isFinite(result)) {
    clearAll();
    updateDisplay("Ошибка");
    return;
  }

  const nextValue = formatNumber(result);
  setCurrentValue(nextValue);
  if (label) {
    addHistory(`${label}(${current}) = ${nextValue}`);
  }
}

function toggleSign() {
  if (operation === null) {
    if (firstOperand === "") {
      firstOperand = "-";
      updateDisplay(firstOperand);
      return;
    }
    if (firstOperand === "-") {
      firstOperand = "";
      updateDisplay("0");
      return;
    }
    applyUnary((value) => (value === 0 ? 0 : value * -1), "+/-");
    return;
  }

  if (shouldResetSecond || secondOperand === "") {
    secondOperand = "-";
    shouldResetSecond = false;
    updateDisplay(secondOperand);
    return;
  }
  if (secondOperand === "-") {
    secondOperand = "";
    updateDisplay("0");
    return;
  }
  secondOperand = String(Number(secondOperand) * -1);
  updateDisplay(secondOperand);
  addHistory(`+/- = ${secondOperand}`);
}

function percent() {
  applyUnary((value) => value / 100, "%");
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

function memorySave() {
  const displayed = getDisplayedNumber();
  if (displayed === null) {
    return;
  }
  memoryValue = displayed;
  updateMemory();
}

function memoryRead() {
  const memText = formatNumber(memoryValue);

  if (operation !== null) {
    secondOperand = memText;
    shouldResetSecond = false;
    updateDisplay(secondOperand);
    return;
  }

  firstOperand = memText;
  updateDisplay(firstOperand);
}

function memoryClear() {
  memoryValue = 0;
  updateMemory();
}

function memoryPlus() {
  const displayed = getDisplayedNumber();
  if (displayed === null) {
    return;
  }
  memoryValue += displayed;
  updateMemory();
}

function memoryMinus() {
  const displayed = getDisplayedNumber();
  if (displayed === null) {
    return;
  }
  memoryValue -= displayed;
  updateMemory();
}

function toggleBackground() {
  bgIndex = (bgIndex + 1) % calcBackgrounds.length;
  calculatorNode.style.background = calcBackgrounds[bgIndex];
}

function toggleResultColor() {
  textIndex = (textIndex + 1) % resultColors.length;
  resultNode.style.color = resultColors[textIndex];
}

function resetTheme() {
  bgIndex = 0;
  textIndex = 0;
  calculatorNode.style.background = calcBackgrounds[0];
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
document.getElementById("btn_op_mem_save").onclick = () => memorySave();
document.getElementById("btn_op_mem_read").onclick = () => memoryRead();
document.getElementById("btn_op_mem_clear").onclick = () => memoryClear();
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

if (toggleHistoryBtn && historyPanelNode) {
  toggleHistoryBtn.onclick = () => {
    const hidden = historyPanelNode.classList.toggle("is-hidden");
    toggleHistoryBtn.textContent = hidden ? "История" : "Скрыть историю";
  };
}

if (clearHistoryBtn) {
  clearHistoryBtn.onclick = () => {
    historyItems.length = 0;
    renderHistory();
  };
}

document.querySelectorAll(".js-alert").forEach((node) => {
  node.addEventListener("click", (event) => {
    event.preventDefault();
    const message = node.dataset.message || "Кнопка нажата";
    alert(message);
  });
});

updateMemory();
updateDisplay("0");
renderHistory();
