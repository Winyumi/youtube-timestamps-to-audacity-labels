/** @type {HTMLFormElement} */
const form = document.querySelector("form");
/** @type {HTMLTextAreaElement} */
const textAreaEl = form.querySelector("#timestamps_input");
/** @type {HTMLButtonElement} */
const prefillBtn = form.querySelector("#prefill");
/** @type {HTMLTextAreaElement} */
const outputEl = document.querySelector("#labels_output");
/** @type {HTMLButtonElement} */
const copyBtn = document.querySelector("button#copy");

// Handlers

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputText = textAreaEl.value.trim();
  if (!inputText) return;

  const inputData = inputText
    .split("\n")
    .map((e) => e.replace(" ", "\t").split("\t"))
    .map(([time, name]) => ({ time, name, seconds: timetoSeconds(time) }));

  const result = inputData
    .map((e) => {
      const s = e.seconds.toFixed(6);
      return `${s}\t${s}\t${e.name}`;
    })
    .join("\n");

  outputEl.value = result;
});

prefillBtn.addEventListener("click", (event) => {
  event.preventDefault();
  textAreaEl.value =
    "00:00 Ahead on Our Way\n03:03 Four Valiant Hearts\n05:42 Lenna's Theme";
});

copyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  outputEl.select();
  try {
    navigator.clipboard.writeText(outputEl.value);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy to clipboard";
    }, 3000);
  } catch (err) {
    alert("Failed to copy to clipboard. Please copy manually instead.");
    console.error(err);
  }
});

// Functions

/** @param {string} str */
function timetoSeconds(str) {
  const [s, m, h = 0] = str
    .split(":")
    .reverse()
    .map((e) => parseInt(e));
  return s + m * 60 + h * 60 * 60;
}
