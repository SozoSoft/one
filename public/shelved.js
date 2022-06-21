/*
    variables, functions, classes, etc. which have been (perhaps temporarily) shelved.
*/

//#region drag cli around
let mouseDown = false;

let originalMouseX = 0;
let originalMouseY = 0;
let offset = [];

document.addEventListener("mousedown", (e) => {
  mouseDown = true;
  setOriginalMouseXY(e);
});
document.addEventListener("mousemove", (e) => mouseDown && moveCanvas(e));
document.addEventListener("mouseup", () => (mouseDown = false));

function setOriginalMouseXY(e) {
  console.log("setting original mouse coords");
  offset = [
    LAND_CANVAS.offsetLeft - e.clientX,
    LAND_CANVAS.offsetTop - e.clientY,
    PLAYER_CANVAS.offsetLeft - e.clientX,
    PLAYER_CANVAS.offsetTop - e.clientY,
  ];
}

function moveCanvas(e) {
  console.log("Moving canvas");
  LAND_CANVAS.style.left = e.clientX + offset[0] + "px";
  LAND_CANVAS.style.top = e.clientY + offset[1] + "px";
  PLAYER_CANVAS.style.left = e.clientX + offset[2] + "px";
  PLAYER_CANVAS.style.top = e.clientY + offset[3] + "px";
}

function dragTerminal(e) {
  if (cli.visible) {
    console.log("clicked");
    cli.move(e.clientX, e.clientY);
  }
}
//#endregion
