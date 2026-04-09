import type { History } from "./types";

let lastActiveHistory: HTMLDivElement | null = null;

export const HISTORY: History[] = [];
export let prev = 0;

export function activeHistory(item: HTMLDivElement) {
  const textArea = document.getElementById("expression") as HTMLTextAreaElement;
  const result = document.getElementById("result") as HTMLDivElement;

  item.classList.toggle("active");
  if (lastActiveHistory && lastActiveHistory !== item) {
    lastActiveHistory.classList.remove("active");
  }
  lastActiveHistory = item.classList.contains("active") ? item : null;
  //   item.scrollIntoView({ behavior: "smooth", block: "center" });

  if (item.classList.contains("active")) {
    const id = item.getAttribute("data-id");
    const history = HISTORY.find((h) => h.id === id);
    if (history) {
      textArea.value = history.answer;
      result.textContent = history.expressions;
    }
  } else {
    textArea.value = "0";
    result.textContent = "0";
  }
}

export function resetActiveHistory() {
  if (lastActiveHistory) {
    lastActiveHistory.classList.remove("active");
    lastActiveHistory = null;
  }
}

export function renderHistory(historyList: History[]) {
  const historytab = document.getElementById("history-items") as HTMLDivElement;
  const history = historyList[historyList.length - 1] as History;

  const historyItem = document.createElement("div") as HTMLDivElement;
  const h4 = document.createElement("h4") as HTMLHeadingElement;
  const p = document.createElement("p") as HTMLParagraphElement;
  const span = document.createElement("span") as HTMLSpanElement;
  const time = history.time.getMinutes();

  // historyItem.ariaLabel = "history items";
  historyItem.classList.add("h-item");
  historyItem.setAttribute("data-id", history.id);
  p.classList.add("equation", "flex", "justify-between");
  span.classList.add("answer");

  h4.textContent = `Standard • ${time >= 1 ? time + "m ago" : "now"}`;
  p.textContent = `${history.expressions}`;
  span.textContent = `${history.answer}`;

  p.appendChild(span);
  historyItem.append(h4, p);

  historyItem.addEventListener("click", () => activeHistory(historyItem));
  historytab.appendChild(historyItem);
}
