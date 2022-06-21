class Action {
  name;
  duration;
  requirements;
  target;
  terrain;
  stopped;
  constructor(name, terrain, target1 = "", target2 = "", duration = 0) {
    this.name = name;
    this.terrain = terrain;
    this.stopped = false;
    switch (
      this.name //basically, quick/dirty factory of actions
    ) {
      case "find water":
        this.duration = 30; //minutes
        this.requirements = ["net", "bait"];
        break;
      case "start fire":
        this.duration = 30;
        this.requirements = ["bow drill", "tinder", "kindling"];
        break;
      case "wander":
        this.duration = 30;
        this.requirements = [];
        break;
      case "collect":
        this.duration = 30;
        this.requirements = [];
        break;
      case "discard":
        this.duration = 30;
        this.requirements = [];
        break;
      case "pick up":
        if (target1 == "") {
          cli.addCommand("No target to pick up specified.");
        }
        break;
      case "throw":
        if (target1 == "") {
          cli.addCommand("No item to throw specified.");
        } else if (target2 == "") {
          cli.addCommand("No target to throw at specified.");
        }
        break;
      case "cook":
        if (target1 == "") {
          cli.addCommand("No item to cook specified.");
        }
        break;
      case "eat":
        if (target1 == "") {
          cli.addCommand("No item to eat specified.");
        }
        break;
      case "sleep":
        if (duration == 0) {
          cli.addCommand("No sleep time specified.");
        }
        break;
      case "drink":
        if (target1 == "") {
          cli.addCommand("No item to drink specified.");
        }
        break;
      case "walk":
        if (target1 == "") {
          cli.addCommand("No direction specified.");
        } else if (target2 == "") {
          cli.addCommand("No distance specified.");
        }
        break;
      case "run":
        if (target1 == "") {
          cli.addCommand("No direction specified.");
        } else if (target2 == "") {
          cli.addCommand("No distance specified.");
        }
        break;
      case "kill":
        if (target1 == "") {
          cli.addCommand("No target specified.");
        }
        break;
      case "feed":
        if (target1 == "") {
          cli.addCommand("No recipient specified.");
        } else if (target2 == "") {
          cli.addCommand("No food specified.");
        }
        break;
      case "pet":
        if (target1 == "") {
          cli.addCommand("No target specified.");
        }
        break;
      case "build":
        break;
      case "demolish":
        if (target1 == "") {
          cli.addCommand("No target specified.");
        }
        break;
    }
  }
  /*
        TODO: add categories of actions: fish, hunt, set traps, catch [object], forage, start fire, 
    */
  stop() {
    this.stopped = true;
  }
  async do(terrain) {
    this.stopped = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    switch (this.name) {
      case "find water":
        const destination = player.findWater(terrain);
        cli.addCommand("Attempting to " + this.name + "...");
        while (
          (player.x !== destination.x || player.y !== destination.y) &&
          !this.stopped
        ) {
          await sleep(500);
          if (destination.x > player.x) {
            player.moveEast();
          } else if (destination.x < player.x) {
            player.moveWest();
          }
          if (destination.y > player.y) {
            player.moveSouth();
          } else if (destination.y < player.y) {
            player.moveNorth();
          }
          player.draw();
        }
        cli.addCommand("You found a great place to " + this.name + "!");
        cli.addCommand(
          "I hope you brought the following items: " +
            this.requirements.join(", ")
        );
        break;
      case "start fire":
        var able = true;
        for (var i = 0; i < this.requirements.length; i++) {
          console.log(this.requirements[i]);
          console.log(player.inventory.indexOf(this.requirements[i]));
          if (player.inventory.indexOf(this.requirements[i]) == -1) {
            cli.addCommand(
              "You need " + this.requirements[i] + " to start a fire!"
            );
            able = false;
          }
        }
        console.log(able);
        console.log(this.requirements.length);
        console.log(player.inventory.length);
        able && cli.addCommand("You are starting a fire...");
        break;
      case "wander":
        let cycle = 0;
        let randDir = 0;
        let visitedCoords = [];
        while (cycle < 30 && !this.stopped) {
          // potentially only tack lastCoord so that you don't trap yourself with previously visited coords
          randDir = Math.floor(Math.random() * 4);
          await sleep(500);
          randDir == 0 &&
            this.terrain.elevations[player.y][player.x + CELL_SIZE] >
              SEA_LEVEL &&
            !visitedCoords.includes(player.x + CELL_SIZE + "," + player.y) &&
            visitedCoords.push(player.x + CELL_SIZE + "," + player.y) &&
            player.moveEast();
          randDir == 1 &&
            this.terrain.elevations[player.y][player.x - CELL_SIZE] >
              SEA_LEVEL &&
            !visitedCoords.includes(player.x - CELL_SIZE + "," + player.y) &&
            visitedCoords.push(player.x - CELL_SIZE + "," + player.y) &&
            player.moveWest();
          randDir == 2 &&
            this.terrain.elevations[player.y + CELL_SIZE][player.x] >
              SEA_LEVEL &&
            !visitedCoords.includes(player.x + "," + (player.y + CELL_SIZE)) &&
            visitedCoords.push(player.x + "," + (player.y + CELL_SIZE)) &&
            player.moveSouth();
          randDir == 3 &&
            this.terrain.elevations[player.y - CELL_SIZE][player.x] >
              SEA_LEVEL &&
            !visitedCoords.includes(player.x + "," + (player.y - CELL_SIZE)) &&
            visitedCoords.push(player.x + "," + (player.y - CELL_SIZE)) &&
            player.moveNorth();
          player.draw();
          cycle++;
        }
        break;
      case "go east":
        while (
          this.terrain.elevations[player.y][player.x + 16] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveEast();
          player.draw();
        }
        break;
      case "go southeast":
        while (
          this.terrain.elevations[player.y + 16][player.x + 16] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveSoutheast();
          player.draw();
        }
        break;
      case "go south":
        while (
          this.terrain.elevations[player.y + 16][player.x] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveSouth();
          player.draw();
        }
        break;
      case "go southwest":
        while (
          this.terrain.elevations[player.y + 16][player.x - 16] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveSouthwest();
          player.draw();
        }
        break;
      case "go west":
        while (
          this.terrain.elevations[player.y][player.x - 16] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveWest();
          player.draw();
        }
        break;
      case "go northwest":
        while (
          this.terrain.elevations[player.y - 16][player.x - 16] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveNorthwest();
          player.draw();
        }
        break;
      case "go north":
        while (
          this.terrain.elevations[player.y - 16][player.x] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveNorth();
          player.draw();
        }
        break;
      case "go northeast":
        while (
          this.terrain.elevations[player.y - 16][player.x + 16] > SEA_LEVEL &&
          !this.stopped
        ) {
          await sleep(500);
          player.moveNortheast();
          player.draw();
        }
        break;
      case "look around":
        cli.addCommand("You are looking around...");
        break;
    }
  }
}
