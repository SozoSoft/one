class Fauna extends Matter {
  abilities; //possible actions
  available_actions;
  current_action; //current action
  active_actions;
  todo_actions;
  constructor(x, y, w, h, fauna_type, canvas, ctx, icon) {
    super(x, y, w, h, fauna_type, canvas, ctx, icon);
    this.abilities = ABILITY_MAP[fauna_type];
    this.active_actions = [];
    this.todo_actions = [];
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.ctx.fillText(this.icon, this.x, this.y);
  }
  moveEast() {
    this.x += CELL_SIZE;
    this.canvas.style.left = this.canvas.offsetLeft - CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft - CELL_SIZE + "px";
  }
  moveSouth() {
    this.y += CELL_SIZE;
    this.canvas.style.top = this.canvas.offsetTop - CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop - CELL_SIZE + "px";
  }
  moveWest() {
    this.x -= CELL_SIZE;
    this.canvas.style.left = this.canvas.offsetLeft + CELL_SIZE + "px";
    LAND_CANVAS.style.left = LAND_CANVAS.offsetLeft + CELL_SIZE + "px";
  }
  moveNorth() {
    this.y -= CELL_SIZE;
    this.canvas.style.top = this.canvas.offsetTop + CELL_SIZE + "px";
    LAND_CANVAS.style.top = LAND_CANVAS.offsetTop + CELL_SIZE + "px";
  }
  moveSoutheast() {
    this.moveSouth();
    this.moveEast();
  }
  moveSouthwest() {
    this.moveSouth();
    this.moveWest();
  }
  moveNorthwest() {
    this.moveNorth();
    this.moveWest();
  }
  moveNortheast() {
    this.moveNorth();
    this.moveEast();
  }
  find(target) {
    switch (target) {
      case "water":
        break;
    }
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
