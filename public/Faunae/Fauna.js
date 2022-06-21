class Fauna extends Matter {
  category;
  icon;
  abilities; //possible actions
  available_actions;
  current_action; //current action
  active_actions;
  todo_actions;
  constructor(x, y, category, canvas, ctx, icon) {
    super();
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = ctx;
    this.category = category;
    this.icon = icon;
    this.active_actions = [];
    this.todo_actions = [];
  }
  draw() {
    this.ctx.clearRect(
      0,
      0,
      PLAYER_CANVAS.clientWidth,
      PLAYER_CANVAS.clientHeight
    );
    this.ctx.fillText(this.icon, this.x, this.y);
  }
  moveEast() {
    this.x += CELL_SIZE;
    PLAYER_CANVAS.style.left = PLAYER_CANVAS.offsetLeft - CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft - CELL_SIZE + "px";
  }
  moveSoutheast() {
    this.x += CELL_SIZE;
    this.y += CELL_SIZE;
    PLAYER_CANVAS.style.left = PLAYER_CANVAS.offsetLeft - CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft - CELL_SIZE + "px";
    PLAYER_CANVAS.style.top = PLAYER_CANVAS.offsetTop - CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop - CELL_SIZE + "px";
  }
  moveSouth() {
    this.y += CELL_SIZE;
    PLAYER_CANVAS.style.top = PLAYER_CANVAS.offsetTop - CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop - CELL_SIZE + "px";
  }
  moveSouthwest() {
    this.x -= CELL_SIZE;
    this.y += CELL_SIZE;
    PLAYER_CANVAS.style.left = PLAYER_CANVAS.offsetLeft + CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft + CELL_SIZE + "px";
    PLAYER_CANVAS.style.top = PLAYER_CANVAS.offsetTop - CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop - CELL_SIZE + "px";
  }
  moveWest() {
    this.x -= CELL_SIZE;
    PLAYER_CANVAS.style.left = PLAYER_CANVAS.offsetLeft + CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft + CELL_SIZE + "px";
  }
  moveNorthwest() {
    this.x -= CELL_SIZE;
    this.y -= CELL_SIZE;
    PLAYER_CANVAS.style.left = PLAYER_CANVAS.offsetLeft + CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft + CELL_SIZE + "px";
    PLAYER_CANVAS.style.top = PLAYER_CANVAS.offsetTop + CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop + CELL_SIZE + "px";
  }
  moveNorth() {
    this.y -= CELL_SIZE;
    PLAYER_CANVAS.style.top = PLAYER_CANVAS.offsetTop + CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop + CELL_SIZE + "px";
  }
  moveNortheast() {
    this.x += CELL_SIZE;
    this.y -= CELL_SIZE;
    PLAYER_CANVAS.style.left = PLAYER_CANVAS.offsetLeft - CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft - CELL_SIZE + "px";
    PLAYER_CANVAS.style.top = PLAYER_CANVAS.offsetTop + CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop + CELL_SIZE + "px";
  }
  setAction(action) {
    if (this.abilities.indexOf(action) !== -1) {
      this.current_action = action;
      this.active_actions.push(this.current_action);
      console.log(
        this.category + " is now doing the following action: " + action
      );
    } else {
      console.log(this.category + " cannot " + action);
    }
  }
}
