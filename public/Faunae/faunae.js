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
      fauna.throw = (item, target) => {};
      break;
  }
  return fauna;
};
