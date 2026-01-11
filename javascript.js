document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#container");
  const body = document.querySelector("body");
  const checkBox = document.querySelector("#random-color");
  let gridSize = 16;

  // function to crate a random number
  function randomColor() {
    return `rgb(${[0, 0, 0].map(() => Math.floor(Math.random() * 256)).join(",")})`;
  }
  // get user input to change the grid size
  function changeGridSizeByUserInput() {
    let userInput = prompt(
      "Please enter the new Grid size between 1 and 100.",
      "16",
    );
    if (parseFloat(userInput)) {
      gridSize = parseFloat(userInput);
      if (gridSize > 100) {
        gridSize = 16;
        alert("Grid size is too high. setting the default (16).");
      }
      drawGrid(gridSize);
    } else {
      gridSize = 16;
      alert(
        "You did not enter a number. The Grid will be redrawn with the default number (16)",
      );
      drawGrid(gridSize);
    }
  }

  // Function to draw the grid in the DOM
  function drawGrid(squareCount = 16) {
    // ensuring that there are no divs yet.
    container.innerHTML = "";

    // creation of the square Divs
    for (let i = 0; i < squareCount * squareCount; i++) {
      const newSquare = document.createElement("div");
      newSquare.className = "square";
      container.appendChild(newSquare);
    }

    // calculating and setting of the square length
    document.documentElement.style.setProperty(
      "--square-length",
      600 / squareCount + "px",
    );
  }

  // colouring and shading of the boxes
  container.addEventListener(
    "mouseenter",
    (e) => {
      // initially mark the box and set the color
      if (e.target.style.opacity === "" && e.target.className === "square") {
        e.target.classList.add("marked");
        e.target.style.opacity = 0.1;

        //select random color if checkbox is checked
        if (checkBox.checked) {
          e.target.style.backgroundColor = randomColor();
        } else {
          e.target.style.backgroundColor = "rgb(255,0,0)";
        }
        // if the box is already marked increae the opacity by 0.1 up to 1
      } else if (
        e.target.style.opacity < 1.0 &&
        e.target.className.includes("marked") //=== "square marked"
      ) {
        let opacity = e.target.style.opacity;
        opacity = String(parseFloat(opacity) + 0.1);
        e.target.style.opacity = opacity;
      }
    },
    true,
  );

  // Event listener for all clicking actions within the body
  body.addEventListener("click", (e) => {
    if (e.target.id === "reset") {
      drawGrid(gridSize);
    } else if (e.target.id === "grid-size") {
      changeGridSizeByUserInput();
    }
  });
  // initial draw of the grid with the initial gridSize
  drawGrid(gridSize);
});
