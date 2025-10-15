const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        display.value = eval(display.value);
      } catch(err) {
        display.value = "Error";
        console.log({err});
      }
    } else if (value === "CE") {
      display.value = "";
    } else if (value === "π") {
      display.value += Math.PI;
    } else {
      display.value += value;
    }
  });
});


