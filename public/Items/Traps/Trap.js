class Trap extends Item {
  is_set;
  constructor() {
    super();
    this.is_drinkable = false;
    this.is_edible = false;
    this.is_atomic = false;
    this.is_compound = true;
    this.is_throwable = false;
  }
}
