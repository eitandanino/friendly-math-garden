const BACKGROUD_COLOR = "#000000";
const LINE_COLOR = "#ffffff";
const LINE_WIDTH = 15;

let currentX = 0;
let currentY = 0;
let previousX = 0;
let previousY = 0;

var canvas;
var context;

function prepareCanvas() {
  // console.log("Preparing canvas");
  canvas = document.getElementById("my-canvas");
  context = canvas.getContext("2d", { willReadFrequently: true });

  context.strokeStyle = LINE_COLOR;
  context.lineWidth = LINE_WIDTH;
  context.lineJoin = "round";

  let isPainting = false;

  context.fillStyle = BACKGROUD_COLOR;
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  document.addEventListener("mousedown", function (event) {
    isPainting = true;
    currentX = event.clientX - canvas.offsetLeft;
    currentY = event.clientY - canvas.offsetTop;
  });

  document.addEventListener("mousemove", function (event) {
    if (isPainting) {
      previousX = currentX;
      currentX = event.clientX - canvas.offsetLeft;

      previousY = currentY;
      currentY = event.clientY - canvas.offsetTop;

      draw();
    }
  });

  document.addEventListener("mouseup", function (event) {
    isPainting = false;
  });

  canvas.addEventListener("mouseleave", function (event) {
    isPainting = false;
  });

  //   This is for devices that uses touch
  canvas.addEventListener("touchstart", function (event) {
    isPainting = true;
    currentX = event.touches[0].clientX - canvas.offsetLeft;
    currentY = event.touches[0].clientY - canvas.offsetTop;
  });

  canvas.addEventListener("touchmove", function (event) {
    if (isPainting) {
      previousX = currentX;
      currentX = event.touches[0].clientX - canvas.offsetLeft;

      previousY = currentY;
      currentY = event.touches[0].clientY - canvas.offsetTop;

      draw();
    }
  });

  canvas.addEventListener("touchsend", function (event) {
    isPainting = false;
  });

  canvas.addEventListener("touchcancel", function (event) {
    isPainting = false;
  });
}

function draw() {
  context.beginPath();
  context.moveTo(previousX, previousY);
  context.lineTo(currentX, currentY);
  context.closePath();
  context.stroke();
}

function clearCanvas() {
  currentX = 0;
  currentY = 0;
  previousX = 0;
  previousY = 0;
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
