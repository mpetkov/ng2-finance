export class TimeoutService {
  timeout:any;

  set(callback:Function, time:number) {
    this.timeout = setTimeout(callback, time);
  }

  clear() {
    clearInterval(this.timeout);
  }
}
