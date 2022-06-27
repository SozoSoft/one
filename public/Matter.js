class Matter {
  x;
  y;
  w;
  h;
  canvas;
  ctx;
  icon;
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} category
   * @param {*} canvas html convas element
   * @param {*} ctx canvas' ctx property
   * @param {*} icon ascii char representing this instance of matter
   */
  constructor(
    x,
    y,
    w,
    h,
    category = null,
    canvas = null,
    ctx = null,
    icon = null
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.category = category;
    this.canvas = canvas;
    this.ctx = ctx;
    this.icon = icon;
  }
}
