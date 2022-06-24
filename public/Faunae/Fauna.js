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
  find(terrain, target) {
    switch (target) {
      case "water":
        console.log("Finding water...");
        for (var row = 0; ; row += CELL_SIZE) {
          for (var col = -row; col <= row; col += CELL_SIZE) {
            if (terrain.elevations[this.y - row][this.x - col] <= SEA_LEVEL) {
              return {
                x: this.x - (col - CELL_SIZE),
                y: this.y - (row - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[this.y - row][this.x + col] <= SEA_LEVEL
            ) {
              return {
                x: this.x + (col - 0),
                y: this.y - (row - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[this.y + row][this.x - col] <= SEA_LEVEL
            ) {
              return {
                x: this.x - (col - CELL_SIZE),
                y: this.y + (row - CELL_SIZE),
              };
            } else if (
              terrain.elevations[this.y + row][this.x + col] <= SEA_LEVEL
            ) {
              return { x: this.x + (col - 0), y: this.y + (row - CELL_SIZE) };
            } else if (
              terrain.elevations[this.y - col][this.x + row] <= SEA_LEVEL
            ) {
              return {
                x: this.x + (row - 0),
                y: this.y - (col - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[this.y - col][this.x - row] <= SEA_LEVEL
            ) {
              return {
                x: this.x - (row - CELL_SIZE),
                y: this.y - (col - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[this.y + col][this.x + row] <= SEA_LEVEL
            ) {
              return { x: this.x + (row - 0), y: this.y + (col - CELL_SIZE) };
            } else if (
              terrain.elevations[this.y + col][this.x - row] <= SEA_LEVEL
            ) {
              return {
                x: this.x - (row - CELL_SIZE),
                y: this.y + (col - CELL_SIZE),
              };
            }
          }
        }
        break;
    }
  }
}
