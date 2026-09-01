export class InputHandler {
  constructor(game) {
    this.game = game;

    this.keys = [];

    this.isFocus = true;

    this.#keyInput();
    this.#windowInput();
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

  #windowInput() {
    window.addEventListener("blur", () => {
      console.log("Blur");

      this.isFocus = false;
    });

    window.addEventListener("focus", () => {
      console.log("Focus");

      this.isFocus = true;
      this.game.resume();
    });
  }
}
