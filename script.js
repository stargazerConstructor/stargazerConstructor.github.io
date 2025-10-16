const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");
var real = "";

function formatNumber(num) {
  // Handle non-numeric results (e.g. NaN, Infinity)
  if (!isFinite(num)) return String(num);

  const absNum = Math.abs(num);

  // If it's small enough, show normally
  if (absNum === 0) return "0";
  if (absNum < 1e6 && absNum > 1e-6) return String(num);

  // Calculate exponent
  let exponent = Math.floor(Math.log10(absNum));
  let base = num / Math.pow(10, exponent);

  // Handle huge exponents recursively
  let expNotation = `10^${exponent}`;
  while (Math.abs(exponent) >= 1e6) {
    exponent = Math.log10(Math.abs(exponent));
    expNotation = `10^(${expNotation})`;
  }

  base = parseFloat(base.toPrecision(6));
  return `${base}×${expNotation}`;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        real += ""
        // Replace all √ symbols with Math.sqrt()
        const expr = real.replace(/√/g, "Math.sqrt");
        real = eval(expr);
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
    } else if (value === "e") {
      real += Math.E;
      display.value += "e";
    } else if (value === "√") {
      // Append √ to display and Math.sqrt( to real expression
      real += "√(";
      display.value += "√(";
    } else if (value === "^") {
      real += "**";
      display.value += "^";
    } else if (value === "sin") {
      real += "Math.sin(";
      display.value += "sin(";
    } else if (value === "cos") {
      real += "Math.cos(";
      display.value += "cos(";
    } else if (value === "tan") {
      real += "Math.tan(";
      display.value += "tan(";
    } else if (value === "round") {
      try {
        real += ""
        // Replace all √ symbols with Math.sqrt()
        const expr = real.replace(/√/g, "Math.sqrt");
        real = Math.round(eval(expr));
        const formatted = formatNumber(real);
        display.value = formatted;
      } catch (err) {
        real = "Error";
        display.value = "Error";
        console.log({ err });
      }
    } else {
      real += value;
      display.value += value;
    }
  });
});






