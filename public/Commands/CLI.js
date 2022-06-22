// /*
// TODO: 
//     * 'look around' -> build this out more
//         * likely 1. check if area has already been 'look around' in
//         * if so, check if sufficient time has passed for more items to have appeared (branches falling, mushrooms growing, etc)
//         * if not, randomly generate items based on biome
//         * display found items in cli
//         * if inventory has space, user may then 'pickup [item]' using either item name, item id#, or * to pick up all
//         * if user inventory full, give error
//     * cancel() -> add id as a parameter cancel(id)
//     * if no parameter passed to cancel, cancel most recent job/action (and pop from list)
//     * id -1 would be the last job/action, -2 the second to last, and so on.
//     * id 1 would be the first job/action (or maybe id 0, not sure which would be most intuitive for most players)
//     * wander -> allow arguments for distance and/or time. (wander 30 - player wanders for 30 seconds)
//     * 'list actions' (or something like that) -> new command to list all currently active actions (like ps in bash)
//         * maybe call this 'doing' or 'active' or 'in progress'
//         * list would provide names, est. time to completion, time running, id (job/action id)
//     * 'look around' -> similar to ls in bash
//     * inventory -> lists items in your inventory
//     * 'pause' -> put an action on hold
//     * 'todo [action][index to be inserted at]' -> adds an action to be done after action at previous index completes
//         * pushes whatever's currently at that index to the following index
// */

class CLI extends Matter {
  visible;
  commands;
  grd;

  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.visible = false;
    this.commands = [];
    this.history = [];
  }
  show() {
    this.grd = CLI_CTX.createLinearGradient(
      this.x,
      this.y,
      this.x + this.w,
      this.y + this.h
    );
    this.grd.addColorStop(0, "rgba(150,0,100,.7)");
    this.grd.addColorStop(0.1, "rgba(150,0,100,.0005)");
    this.grd.addColorStop(0.15, "rgba(150,0,100,0)");
    CLI_CTX.clearRect(this.x, this.y, this.w, this.h);
    CLI_CTX.fillStyle = this.grd;
    CLI_CTX.fillRect(this.x, this.y, this.w, this.h);
    CLI_CTX.fillStyle = "rgb(100,255,200)";
    if (
      this.commands[this.commands.length - 1] !== "cls" ||
      this.commands[this.commands.length - 1] !== "clear"
    ) {
      for (var line = 0; line < this.commands.length; line++) {
        CLI_CTX.fillText(
          "> " + this.commands[line],
          this.x + 4,
          this.y + 16 + line * 16
        );
      }
    }
    CLI_CTX.fillText(">", this.x + 4, this.y + 16 + this.commands.length * 16);
    this.visible = true;
  }
  move(newx, newy) {
    CLI_CTX.clearRect(this.x, this.y, this.w, this.h);
    this.x = newx;
    this.y = newy;
    this.show();
  }
  update(ch) {
    this.show();
    CLI_CTX.fillText(ch, this.x + 22, this.y + 16 + this.commands.length * 16);
  }
  hide() {
    CLI_CTX.clearRect(this.x, this.y, this.w, this.h);
    this.visible = false;
  }
  /* TODO: don't save notifications to command history (such as "you are fishing...")*/
  addCommand(command, terrain) {
    let action;
    switch (command) {
      case "stop":
        console.log(
          "Number of Active Actions: " + player.active_actions.length
        );
        console.log("Stopping: " + player.current_action);
        this.history.push(command);
        player.active_actions.pop().stop();
        this.clearCommands();
        this.show();
        break;
      case "find water":
      case "go east":
      case "go southeast":
      case "go south":
      case "go southwest":
      case "go west":
      case "go northwest":
      case "go north":
      case "go northeast":
      case "look around":
      case "wander":
      case "start fire":
        this.commands.push(command);
        this.history.push(command);
        this.clearCommands();
        this.show();
        action = new Action(command, terrain);
        player.current_action = action;
        player.current_action.do(terrain);
        player.active_actions.push(player.current_action);
        break;
      case "clear":
      case "cls":
        this.history.push(command);
        this.clearCommands();
        this.show();
        break;
      default:
        this.commands.push(command);
        this.show();
        break;
    }
  }

  clearCommands() {
    this.commands = [];
  }
}

const text = document.getElementById("text");

isMobile &&
  (text.oninput = () => {
    console.log("You typed: " + text.value);
    cli_event({ key: text.value });
  });

isMobile &&
  (text.onsubmit = () => {
    cli_event({ key: "Enter", keyCode: 13 });
  });

document.addEventListener("keydown", cli_event);

let command = "";
let prevCommandCounter = 0;

function cli_event(e) {
  switch (e.key) {
    case "Escape":
      break;
    case "Enter":
      prevCommandCounter > 0
        ? (command = cli.history[cli.history.length - prevCommandCounter])
        : null;
      prevCommandCounter = 0;
      cli.visible && cli.addCommand(command, terrain);
      command = "";
      text.value = "";

      break;
    case "Backspace":
      prevCommandCounter = 0;
      cli.visible && command.length > 0
        ? (command = command.slice(0, -1))
        : null;
      cli.visible && cli.update(command);
      break;
    case "Shift":
      prevCommandCounter = 0;
      break;
    case "ArrowUp":
      e.preventDefault();
      cli.visible &&
        cli.history.length > 0 &&
        prevCommandCounter < cli.history.length &&
        prevCommandCounter++;
      cli.visible &&
        cli.history[cli.history.length - prevCommandCounter] !== undefined &&
        cli.update(cli.history[cli.history.length - prevCommandCounter]);
      break;
    case "ArrowDown":
      e.preventDefault();
      cli.visible &&
        cli.history.length > 0 &&
        prevCommandCounter > 0 &&
        prevCommandCounter-- &&
        cli.history[cli.history.length - prevCommandCounter] !== undefined &&
        cli.update(cli.history[cli.history.length - prevCommandCounter]);
      break;
    case "Control":
      break;
    case "Alt":
      break;
    case "Tab":
      break;
    case "CapsLock":
      break;

    default:
      e.key = e.key.replace("Unidentified", "");
      console.log("You typed: " + e.key);
      e.key == " " && e.preventDefault();
      e.key == " " && (text.value += " ");
      prevCommandCounter = 0;
      cli.visible
        ? (isMobile && (command = text.value.trim())) || (command += e.key)
        : null;
      command = command.replace("Unidentified", "");
      cli.visible && cli.update(command);
      break;
  }
}
