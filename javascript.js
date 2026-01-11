document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#container");
  const body = document.querySelector("body");

  function drawGrid(squareCount = 16) {
    // creation of the square Divs
    for (let i = 0; i < squareCount * squareCount; i++) {
      const newSquare = document.createElement("div");
      newSquare.className = "square";
      // newSquare.style.opacity = 0.0;
      // newSquare.id = i;
      container.appendChild(newSquare);
    }
    // calculating and setting of the square length
    document.documentElement.style.setProperty(
      "--square-length",
      600 / squareCount + "px",
    );
  }

  drawGrid(32);

  // colouring and shading of the boxes
  container.addEventListener(
    "mouseenter",
    (e) => {
      // console.log(e.target.style.opacity);
      if (e.target.style.opacity === "" && e.target.className === "square") {
        e.target.classList.add("marked");
        e.target.style.opacity = 0.1;
      } else if (
        e.target.style.opacity < 1.0 &&
        e.target.className === "square marked"
      ) {
        let opacity = e.target.style.opacity;
        opacity = String(parseFloat(opacity) + 0.1);
        e.target.style.opacity = opacity;
      }
    },
    true,
  );
});
