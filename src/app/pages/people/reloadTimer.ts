export const INTERVAL: number = 5000;
export class Timer {
  timerId: NodeJS.Timeout | null = null;
  start: number = Date.now();
  remaining: number = INTERVAL;
  callback: any;
  constructor(callback: any, delay: number) {
    this.remaining = delay;
    this.callback = callback;
    this.resume();
  }
  public pause() {
    this.stop();
    this.remaining -= Date.now() - this.start;
  }

  public resume() {
    if (this.timerId) {
      return;
    }

    this.start = Date.now();
    this.timerId = setTimeout(this.callback, this.remaining);
  }

  public stop() {
    if (!this.timerId) return;
    clearTimeout(this.timerId);
    this.timerId = null;
  }
}
