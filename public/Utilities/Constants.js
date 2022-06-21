//#region browser dimentions
const WINDOW_WIDTH =
  document.body.clientWidth - (document.body.clientWidth % 16);
const WINDOW_HEIGHT =
  document.body.clientHeight - (document.body.clientHeight % 16);
//#endregion

const TYPES = { PLAYER: "player", DEER: "deer" };
const ICONS = {
  PLAYER: "🧔",
  DEER: "🦌",
  WOLF: "🐺",
  FOX: "🦊",
  FIRE: "🔥",
  DEAD_PLAYER: "💀",
  LIFE: "❤️",
};
const COLORS = {};

const SEA_LEVEL = 100;
const CELL_SIZE = 16;
const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 3200;
//#endregion

//#region CANVASES
const LAND_CANVAS = document.getElementById("terrain");
const PLAYER_CANVAS = document.getElementById("player");
const CLI_CANVAS = document.getElementById("cli");
const LAND_CTX = LAND_CANVAS.getContext("2d");
const PLAYER_CTX = PLAYER_CANVAS.getContext("2d");
const CLI_CTX = CLI_CANVAS.getContext("2d");
const FAUNA_CANVAS = document.getElementById("fauna");
const FAUNA_CTX = FAUNA_CANVAS.getContext("2d");
//#endregion

//#region player initial coords
const RX = Math.floor(Math.random() * (WORLD_WIDTH - 16));
const RANDOM_X = Math.abs(RX - (RX % 16));

const RY = Math.floor(Math.random() * (WORLD_HEIGHT - 16));
const RANDOM_Y = Math.abs(RY - (RY % 16)) == 0 ? 16 : Math.abs(RY - (RY % 16));
//#endregion

//#region derivatives
LAND_CANVAS.width = WORLD_WIDTH;
LAND_CANVAS.height = WORLD_HEIGHT;
LAND_CTX.font = "32px Consolas";

PLAYER_CANVAS.width = WORLD_WIDTH;
PLAYER_CANVAS.height = WORLD_HEIGHT;
PLAYER_CTX.fillStyle = `rgba(255,200,200,1)`;
PLAYER_CTX.font = "16px Consolas";

CLI_CANVAS.width = WORLD_WIDTH;
CLI_CANVAS.height = WORLD_HEIGHT;
CLI_CTX.font = "16px Consolas";
//#endregion
