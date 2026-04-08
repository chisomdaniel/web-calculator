function calculate(a: number = 0, b: number = 0, operation: string): number {
  if (operation === "+") {
    return a + b;
  }
  return a;
}

let prev: number = 0;
let calMode = false;

function pressButton(event: Event) {
  const textArea = document.getElementById("expression") as HTMLTextAreaElement;
  const result = document.getElementById("result") as HTMLDivElement;
  const button = event.target as HTMLButtonElement;
  const special = ["sin", "cos", "tan", "log", "ln", "x²", "x^3", "x^y", "o"];
  const operators = ["ac", "()", "%", "÷", "x", "-", "+", "equal", "delete"];

  if (operators.includes(button.value)) {
    // perform operator action
    switch (button.value) {
      case "delete":
        textArea.value = textArea.value.slice(0, -1);
        break;
      case "ac":
        textArea.value = "0";
        // result.textContent = "0";
        prev = 0;
        break;
      case "()":
        break;
      case "equal":
        break;
      default:
        calMode = true;
        prev = calculate(prev, parseFloat(textArea.value), button.value);
        if (result.textContent === "0") {
          result.textContent = `${textArea.value} ${button.value} `;
        } else {
          result.textContent += `${textArea.value} ${button.value} `;
        }
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
    } else {
      textArea.value += button.value;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const keypad = document.getElementById("keypad") as HTMLButtonElement;

  keypad.addEventListener("click", pressButton);
});
