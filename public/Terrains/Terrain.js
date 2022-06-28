/**
 * @classdesc Generate, populate, and draw terrain.
 */
class Terrain extends Matter {
  elevations = [];
  river = [];
  items = [];
  constructor() {
    super();
    noise.seed(Math.random());
    for (var row = 0; row <= LAND_CANVAS.height; row += CELL_SIZE) {
      this.elevations[row] = [];
      this.items[row] = [];
      for (var column = 0; column < LAND_CANVAS.width; column += CELL_SIZE) {
        let elev1 = row / (LAND_CANVAS.height * 0.565);
        let elev2 = column / (LAND_CANVAS.width * 0.565);
        let elev3 = (LAND_CANVAS.height - row) / (LAND_CANVAS.height * 0.565);
        let elev4 = (LAND_CANVAS.width - column) / (LAND_CANVAS.width * 0.565);
        this.elevations[row][column] =
          noise.perlin2(column / 350, row / 350) * 48 + 200;
        this.elevations[row][column] *= elev1 * elev2 * elev3 * elev4;
        if (this.elevations[row][column] > SEA_LEVEL) {
          this.items[row][column] = new Item().generateRandomItemsList();
        }
      }
    }
  }
  draw() {
    LAND_CTX.clearRect(0, 0, LAND_CANVAS.width, LAND_CANVAS.height);
    // LAND_CTX.fillStyle = "rgb(0,75,150)";
    LAND_CTX.fillStyle = "rgb(0,30,40)";
    LAND_CTX.fillRect(0, 0, LAND_CANVAS.width, LAND_CANVAS.height);
    for (var row = 0; row < LAND_CANVAS.height + CELL_SIZE; row += CELL_SIZE) {
      for (
        var column = 0;
        column < LAND_CANVAS.width + CELL_SIZE;
        column += CELL_SIZE
      ) {
        let color = this.elevations[row][column];
        let alpha = this.elevations[row][column] * 0.005;

        if (color > 132) {
          LAND_CTX.fillStyle = "rgb(10,40,0)";
          LAND_CTX.fillText("#", column, row);
        } else if (color > 130) {
          LAND_CTX.fillStyle = "rgb(10,50,0)";
          LAND_CTX.fillText("#", column, row);
        } else if (color > 110) {
          LAND_CTX.fillStyle = "rgb(10,60,0)";
          LAND_CTX.fillText("#", column, row);
        } else if (color > 106) {
          LAND_CTX.fillStyle = "rgb(10,80,0)";
          LAND_CTX.fillText("#", column, row);
        } else if (color > 102) {
          LAND_CTX.fillStyle = "rgb(50,100,20)";
          LAND_CTX.fillText("#", column, row);
        } else if (color > SEA_LEVEL) {
          LAND_CTX.fillStyle = `rgba(255,255,150)`;
          LAND_CTX.fillText("#", column, row);
        } else {
          LAND_CTX.fillStyle = `rgba(0,75,150,${alpha})`;
          LAND_CTX.fillText("~", column, row);
        }
      }
    }
  }
}
