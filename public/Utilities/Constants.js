/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

const os = getMobileOperatingSystem();
const isMobile = os == "Android" || os == "iOS" || os == "Windows Phone";

//#region browser dimentions
const WINDOW_WIDTH =
  document.body.clientWidth - (document.body.clientWidth % 16);
const WINDOW_HEIGHT =
  document.body.clientHeight - (document.body.clientHeight % 16);
//#endregion

const COMMANDS = [
  "go",
  "walk",
  "run",
  "throw",
  "find",
  "clear",
  "cls",
  "make",
  "create",
  "craft",
  "drop",
  "collect",
  "equip",
  "sleep",
  "wander",
  "explore",
  "look",
  "stop",
  "eat",
  "fly",
  "slither",
  "show",
];
const DIRECTIONS = [
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
  "northwest",
  "around",
];
const FLORAE = ["grass", "rose", "clover", "mushroom", "tree", "bush", "weed"];
const FAUNAE = [
  "goat",
  "sheep",
  "snake",
  "deer",
  "wolf",
  "squirrel",
  "fish",
  "bird",
  "rabbit",
];
const RAW_ITEMS = ["rock", "stick", "mushroom", "leaf", "bark"];
const CRAFTABLE_ITEMS = [
  "bow",
  "bowdrill",
  "string",
  "cordage",
  "rope",
  "basket",
  "spear",
];
const ALL_ITEMS = RAW_ITEMS.concat(
  CRAFTABLE_ITEMS.concat(FLORAE.concat(FAUNAE))
);
const EDIBLES = [
  "cooked chicken",
  "cooked fish",
  "cooked squirrel",
  "cooked rabbit",
];
const CLI_ITEMS = ["inventory", "jobs", "processes", "queue", "tasks", "help"];
const COOKABLES = ["chicken", "fish", "squirrel", "rabbit"];
const THROWABLES = ["stick", "rock", "spear"];
const EQUIPABLES = ["stick", "rock", "spear", "bow"];
const ARGUMENT_MAP = {
  walk: DIRECTIONS,
  run: DIRECTIONS,
  go: DIRECTIONS,
  look: DIRECTIONS,
  explore: DIRECTIONS,
  wander: DIRECTIONS,
  find: ALL_ITEMS,
  craft: CRAFTABLE_ITEMS,
  create: CRAFTABLE_ITEMS,
  make: CRAFTABLE_ITEMS,
  drop: ALL_ITEMS,
  process: ALL_ITEMS,
  equip: ALL_ITEMS,
  eat: ALL_ITEMS,
  drink: ALL_ITEMS,
  throw: ALL_ITEMS,
  collect: ALL_ITEMS,
  show: CLI_ITEMS,
};
const PLAYER_ABILITIES = [
  "throw",
  "cook",
  "make",
  "create",
  "craft",
  "eat",
  "walk",
  "go",
  "run",
  "wander",
  "collect",
  "equip",
  "find",
  "start",
  "look",
  "show",
];
const BIRD_ABILITIES = ["fly"];
const SNAKE_ABILITIES = ["slither"];
const ALL_ABILITIES = BIRD_ABILITIES.concat(PLAYER_ABILITIES);
const ABILITY_MAP = {
  player: PLAYER_ABILITIES,
};
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
const ITEM_CANVAS = document.getElementById("item");
const ITEM_CTX = FAUNA_CANVAS.getContext("2d");

/* TODO: decide whether inventory is going to be its own canvas/ctx, or just another cli output*/
const INVENTORY_CANVAS = document.getElementById("inventory");
const INVENTORY_CTX = INVENTORY_CANVAS.getContext("2d");
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

ITEM_CANVAS.width = WORLD_WIDTH;
ITEM_CANVAS.height = WORLD_HEIGHT;
//#endregion
