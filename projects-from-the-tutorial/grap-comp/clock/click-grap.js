class Clock {
  constructor(options) {
    this.elem = options.elem;
    // this.start();
  }

  start() {
    this.render();
    clearInterval(this.id);
    this.id = setInterval(() => {
      this.render();
    }, 1000);
  }

  stop() {
    clearInterval(this.id);
  }

  prefix(num) {
    return num < 10 ? `0${num}` : num;
  }

  render() {
    const now = new Date();
    const hour = this.prefix(now.getHours());
    const min = this.prefix(now.getMinutes());
    const sec = this.prefix(now.getSeconds());
    this.elem.querySelector('.hour').textContent = hour;
    this.elem.querySelector('.min').textContent = min;
    this.elem.querySelector('.sec').textContent = sec;
  }
}