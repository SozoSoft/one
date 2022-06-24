class Command {
  cmd;
  args;
  is_active;
  is_enqueued;
  total_time;
  time_remaining;
  is_completed;
  wait_time;
  constructor(cmd, args = [], actor, terrain) {
    if (COMMANDS.indexOf(cmd) == -1) {
      throw "Unknown Command!";
    } else if (args.length && ARGUMENT_MAP[cmd].indexOf(args[0]) == -1) {
      throw "Invalid Argument: " + args[0] + " for command: " + cmd;
    } else {
      action = new Action(cmd, terrain, args, actor);
    }
    this.cmd = cmd;
    this.args = args;
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
