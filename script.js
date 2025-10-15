const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");
var real = ""

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        real = eval(real.value);
        display.value = real
      } catch(err) {
        real = "Error";
        display.value = "Error";
        console.log({err});
      }
    } else if (value === "CE") {
      real = "";
      display.value = "";
    } else if (value === "π") {
      real += Math.PI;
      display.value += "π";
    } else {
      real += value;
      display.value += value;
    }
  });
});




