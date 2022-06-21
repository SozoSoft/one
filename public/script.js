window.onload = function () {
  var text = document.getElementById("text");
  text.focus();
};
const terrain = new Terrain();

const player = generate(
  new Fauna(
    RANDOM_X,
    RANDOM_Y,
    TYPES.PLAYER,
    PLAYER_CANVAS,
    PLAYER_CTX,
    ICONS.PLAYER
  ),
  TYPES.PLAYER,
  LAND_CANVAS,
  LAND_CTX
);

const deer = generate(
  new Fauna(
    RANDOM_X + CELL_SIZE,
    RANDOM_Y,
    TYPES.DEER,
    FAUNA_CANVAS,
    FAUNA_CTX,
    ICONS.DEER
  ),
  TYPES.DEER,
  LAND_CANVAS,
  LAND_CTX
);

const cli = new CLI(0, 0, CLI_CANVAS.width, CLI_CANVAS.height);

//#region place player on land
try {
  while (
    terrain.elevations[player.y][player.x] <= SEA_LEVEL ||
    player.y < 32 ||
    player.x < 32
  ) {
    let newx = Math.floor(Math.random() * (WORLD_WIDTH - 16));
    newx = Math.abs(newx - (newx % 16));

    let newy = Math.floor(Math.random() * (WORLD_HEIGHT - 16));
    newy =
      Math.abs(newy - (newy % 16)) == 0 ? 16 : Math.abs(newy - (newy % 16));
    player.x = newx;
    player.y = newy;
  }
  deer.x = player.x + 16;
  deer.y = player.y;
} catch (e) {
  console.log(e);
}
//#endregion

//#region center player on screen
LAND_CANVAS.style.left -= player.x - WINDOW_WIDTH / 2;
LAND_CANVAS.style.top -= player.y - WINDOW_HEIGHT / 2;
PLAYER_CANVAS.style.left -= player.x - WINDOW_WIDTH / 2;
PLAYER_CANVAS.style.top -= player.y - WINDOW_HEIGHT / 2;
FAUNA_CANVAS.style.left -= player.x - WINDOW_WIDTH / 2;
FAUNA_CANVAS.style.top -= player.y - WINDOW_HEIGHT / 2;
//#endregion

//#region draw
terrain.draw();
player.draw();
// deer.draw();
cli.show();
//#endregion
