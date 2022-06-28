class Item extends Matter {
  is_atomic;
  is_compound;
  is_throwable;
  is_drinkable;
  is_edible;
  constructor() {
    super();
  }
  generateRandomItemsList() {
    let randomItemsList = {};
    for (let i = 0; i < RAW_ITEMS.length; i++) {
      randomItemsList[RAW_ITEMS[i]] = Math.floor(Math.random() * 10);
    }
    return randomItemsList;
  }
}
