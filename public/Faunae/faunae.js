const generate = (fauna, kind, terrain_canvas, terrain_ctx) => {
  switch (kind) {
    case "deer":
      fauna.icon = ICONS.DEER;
    case "player":
      fauna.inventory = [];
      fauna.pickUp = (item) => {
        fauna.inventory.push(item);
      };
      fauna.discard = (item) => {
        fauna.inventory.splice(fauna.inventory.indexOf(item), 1);
      };
      fauna.findWater = (terrain) => {
        console.log("Finding water...");
        for (var row = 0; ; row += CELL_SIZE) {
          for (var col = -row; col <= row; col += CELL_SIZE) {
            if (terrain.elevations[fauna.y - row][fauna.x - col] <= SEA_LEVEL) {
              return {
                x: fauna.x - (col - CELL_SIZE),
                y: fauna.y - (row - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[fauna.y - row][fauna.x + col] <= SEA_LEVEL
            ) {
              return {
                x: fauna.x + (col - 0),
                y: fauna.y - (row - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[fauna.y + row][fauna.x - col] <= SEA_LEVEL
            ) {
              return {
                x: fauna.x - (col - CELL_SIZE),
                y: fauna.y + (row - CELL_SIZE),
              };
            } else if (
              terrain.elevations[fauna.y + row][fauna.x + col] <= SEA_LEVEL
            ) {
              return { x: fauna.x + (col - 0), y: fauna.y + (row - CELL_SIZE) };
            } else if (
              terrain.elevations[fauna.y - col][fauna.x + row] <= SEA_LEVEL
            ) {
              return {
                x: fauna.x + (row - 0),
                y: fauna.y - (col - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[fauna.y - col][fauna.x - row] <= SEA_LEVEL
            ) {
              return {
                x: fauna.x - (row - CELL_SIZE),
                y: fauna.y - (col - CELL_SIZE * 2),
              };
            } else if (
              terrain.elevations[fauna.y + col][fauna.x + row] <= SEA_LEVEL
            ) {
              return { x: fauna.x + (row - 0), y: fauna.y + (col - CELL_SIZE) };
            } else if (
              terrain.elevations[fauna.y + col][fauna.x - row] <= SEA_LEVEL
            ) {
              return {
                x: fauna.x - (row - CELL_SIZE),
                y: fauna.y + (col - CELL_SIZE),
              };
            }
          }
        }
      };
      break;
  }
  return fauna;
};
