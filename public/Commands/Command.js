class Command {
  cmd;
  args;
  is_active;
  is_enqueued;
  total_time;
  time_remaining;
  is_completed;
  wait_time;
  constructor(cmd, args = []) {
    this.cmd = cmd;
    this.args = args;
    switch (cmd) {
      case "walk":
        switch (args[0]) {
          case "north":
            break;
          case "northeast":
            break;
          case "east":
            break;
          case "southeast":
            break;
          case "south":
            break;
          case "southwest":
            break;
          case "west":
            break;
          case "northwest":
            break;
          default:
            break; //give user a message about proper use of "walk" command
        }
        args[1] && (this.total_time = args[1]); //walk for that amount of time

      case "collect":
        switch (args[0]) {
          case "sticks":
            break;
          case "rocks":
            break;
          case "bark":
            break;
          case "leaves":
            break;
          case "mushrooms":
            break;
          case "worms":
            break;
          default:
            break; //give user message about known items available to for collection
        }
    }
  }
  activate() {
    this.is_active = true;
    this.wait_time = 0;
  }
  cancel() {
    this.is_active = false;
  }
  pause() {
    this.is_active = false;
  }
  enqueue() {
    this.is_enqueued = true;
    this.is_active = false;
  }
  tick(time_increment) {
    this.time_remaining && (this.time_remaining -= time_increment);
    if (!this.time_remaining) {
      this.complete();
    }
  }
  complete() {
    this.is_completed = true;
    this.is_active = false;
    this.is_enqueued = false;
  }
  wait(duration) {
    this.is_active = false;
    this.is_enqueued = true;
    this.wait_time = duration;
  }
  add_time(duration) {
    this.time_remaining += duration;
  }
}
