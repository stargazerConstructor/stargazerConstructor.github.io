const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");
var real = "";

function formatNumber(num) {
  // Handle non-numeric results (e.g. NaN, Infinity)
  if (!isFinite(num)) return String(num);

  // Convert to absolute value to analyze magnitude
  const absNum = Math.abs(num);

  // If it's a small number, just show normally
  if (absNum === 0) return "0";
  if (absNum < 1e6 && absNum > 1e-6) return String(num);

  // Calculate exponent
  let exponent = Math.floor(Math.log10(absNum));
  let base = num / Math.pow(10, exponent);

  // Keep formatting if exponent itself is huge
  let expNotation = `10^${exponent}`;
  while (Math.abs(exponent) >= 1e6) {
    exponent = Math.log10(Math.abs(exponent));
    expNotation = `10^(${expNotation})`;
  }

  // Round base a bit for cleaner display
  base = parseFloat(base.toPrecision(6));

  return `${base}×${expNotation}`;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        real = eval(real);
        const formatted = formatNumber(real);
        display.value = formatted;
      } catch (err) {
        real = "Error";
        display.value = "Error";
        console.log({ err });
      }
    } else if (value === "CE") {
      real = "";
      display.value = "";
    } else if (value === "π") {
      real += Math.PI;
      display.value += "π";
    } else if (value === "^") {
      real += "**";
      display.value += "^";
    } else {
      real += value;
      display.value += value;
    }
  });
});
