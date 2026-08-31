export class InputHandler {
  constructor() {
    this.keys = [];

    this.#keyInput();
  }

  #keyInput() {
    const inputKey = ["a", "d", "arrowleft", "arrowright"];

    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      if (inputKey.includes(key) && !this.keys.includes(key)) {
        this.keys.push(key);
      }
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key.toLowerCase());

      if (index > -1) {
        const key = this.keys.splice(index, 1);
      }
    });
  }
}
