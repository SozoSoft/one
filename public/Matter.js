/*
    Eventually, all spatial classes should extend Matter
*/

class Matter {
  x;
  y;
  w;
  h;
  canvas;
  ctx;
  icon;
  constructor(x, y, w, h, category = null, canvas = null, ctx = null, icon = null){
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
