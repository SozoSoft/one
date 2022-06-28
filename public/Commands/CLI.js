class CLI extends Matter {
  visible;
  commands;
  grd;
  /**
   *
   * @param {number} x cli leftmost x coord
   * @param {number} y cli topmost y coord
   * @param {number} w cli width
   * @param {number} h cli height
   */
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

  //TODO: design help menu
  displayHelpMenu() {}

  update(ch) {
    this.show();
    CLI_CTX.fillText(ch, this.x + 22, this.y + 16 + this.commands.length * 16);
  }

  //show informational message
  addMessage(message, terrain) {
    this.commands.push(message);
    this.show();
  }

  //show error message
  addError(err) {
    this.commands.push(err);
    this.show();
  }
  addCommand(command, terrain) {
    command = command.toLowerCase();
    const cmdArray = command.split(" ");
    console.log(cmdArray.length);
    const newCMD = cmdArray[0];
    const args = cmdArray.slice(1, cmdArray.length);
    try {
      console.log(newCMD);
      console.log(COMMANDS);
      console.log(COMMANDS.indexOf(newCMD) !== -1);
      const newCommand = new Command(newCMD, args, player, terrain);
    } catch (err) {
      this.clearCommands();
      this.addError(err);
      this.show();
    }

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
      case "show inventory":
      case "wander":
      case "start fire":
        this.commands.push(command);
        this.history.push(command);
        this.clearCommands();
        this.show();
        action = new Action(command, terrain, [], player);
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
      cli.addCommand(command, terrain);
      command = "";
      text.value = "";

      break;
    case "Backspace":
      prevCommandCounter = 0;
      command.length > 0 ? (command = command.slice(0, -1)) : null;
      cli.update(command);
      break;
    case "Shift":
      prevCommandCounter = 0;
      break;
    case "ArrowUp":
      e.preventDefault();
      cli.history.length > 0 &&
        prevCommandCounter < cli.history.length &&
        prevCommandCounter++;
      cli.history[cli.history.length - prevCommandCounter] !== undefined &&
        cli.update(cli.history[cli.history.length - prevCommandCounter]);
      break;
    case "ArrowDown":
      e.preventDefault();
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
      (isMobile && (command = text.value.trim())) || (command += e.key);
      command = command.replace("Unidentified", "");
      cli.update(command);
      break;
  }
}
