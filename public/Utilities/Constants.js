/*
TODO: 
    * 'look around' -> build this out more
        * likely 1. check if area has already been 'look around' in
        * if so, check if sufficient time has passed for more items to have appeared (branches falling, mushrooms growing, etc)
        * if not, randomly generate items based on biome
        * display found items in cli
        * if inventory has space, user may then 'pickup [item]' using either item name, item id#, or * to pick up all
        * if user inventory full, give error
    * cancel() -> add id as a parameter cancel(id)
    * if no parameter passed to cancel, cancel most recent job/action (and pop from list)
    * id -1 would be the last job/action, -2 the second to last, and so on.
    * id 1 would be the first job/action (or maybe id 0, not sure which would be most intuitive for most players)
    * wander -> allow arguments for distance and/or time. (wander 30 - player wanders for 30 seconds)
    * 'list actions' (or something like that) -> new command to list all currently active actions (like ps in bash)
        * maybe call this 'doing' or 'active' or 'in progress'
        * list would provide names, est. time to completion, time running, id (job/action id)
    * 'look around' -> similar to ls in bash
    * inventory -> lists items in your inventory
    * 'pause' -> put an action on hold
    * 'todo [action][index to be inserted at]' -> adds an action to be done after action at previous index completes
        * pushes whatever's currently at that index to the following index
*/
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
