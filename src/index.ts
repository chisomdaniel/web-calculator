import type { History } from "./types";
import { renderHistory, resetActiveHistory, HISTORY } from "./utils.js";

let prev = 0; // used to store the result of the last calculation for chaining operations
let calMode = false; // track if an operator was pressed to determine when to reset the input for new numbers
let done = false; // track if the equal button was pressed to reset the state for new calculations
let operator: string = ""; // store the current operator for calculations
// let parentesis = false;

function calculate(a: number = 0, b: number = 0, operation: string): number {
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    case "x":
      return a * b;
    case "%":
      return a % b;
  }
  return a;
}

function pressButton(event: Event) {
  const textArea = document.getElementById("expression") as HTMLTextAreaElement;
  const result = document.getElementById("result") as HTMLDivElement;
  const button = event.target as HTMLButtonElement;
  const special = ["sin", "cos", "tan", "log", "ln", "x²", "x^3", "x^y", "o"];
  const operators = ["ac", "()", "%", "/", "x", "-", "+", "equal", "delete"];

  if (operators.includes(button.value)) {
    // perform operator action
    switch (button.value) {
      case "delete":
        textArea.value = textArea.value.slice(0, -1);
        break;
      case "ac":
        textArea.value = "0";
        result.textContent = "0";
        // console.log("i am here", " result content is ", result.textContent);
        prev = 0;
        resetActiveHistory();
        break;
      case "()":
        break;
      case "equal":
        // calMode = true;
        done = true;
        result.textContent += `${textArea.value}`;
        textArea.value = calculate(
          prev,
          parseFloat(textArea.value),
          operator,
        ).toString();
        HISTORY.push({
          id: HISTORY.length.toString(),
          expressions: result.textContent,
          answer: textArea.value,
          time: new Date(),
        });
        prev = parseFloat(textArea.value);
        renderHistory(HISTORY);
        resetActiveHistory();
        break;
      default:
        calMode = true;
        operator = button.value;
        if (result.textContent === "0" || done) {
          result.textContent = `${textArea.value} ${button.value} `;
        } else {
          result.textContent += `${textArea.value} ${button.value} `;
        }
        if (done) {
          prev = 0;
          done = false;
        }
        prev = calculate(prev, parseFloat(textArea.value), button.value);
        textArea.value = prev.toString();
        break;
    }
  } else if (special.includes(button.value)) {
    // perform special action
  } else if (button.nodeName === "BUTTON") {
    // type digits
    if (textArea.value === "0") {
      textArea.value = button.value;
    } else if (calMode) {
      textArea.value = button.value;
      calMode = false;
    } else if (done) {
      textArea.value = button.value;
      result.textContent = "0";
      prev = 0;
      done = false;
    } else {
      textArea.value += button.value;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const keypad = document.getElementById("keypad") as HTMLButtonElement;
  const historyItem = document.getElementsByClassName(
    "h-item",
  ) as HTMLCollectionOf<HTMLDivElement>;
  const historytab = document.getElementById("history-items") as HTMLDivElement;

  keypad.addEventListener("click", pressButton);
  historytab.addEventListener("click", (event) => {
    const target = event.target as HTMLDivElement;
    if (target) {
      prev = 0;
    }
  });
});
