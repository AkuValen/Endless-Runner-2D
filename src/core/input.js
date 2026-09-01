export class InputHandler {
  constructor(game) {
    this.game = game;

    this.keys = [];
    this.touch = {};

    this.isFocus = true;
    this.isDrag = false;

    this.#keyInput();
    this.#touchInput();
    this.#windowInput();
    this.#documentInput();
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

  #touchInput() {
    window.addEventListener(
      "touchstart",
      (e) => {
        this.touch.startX = e.touches[0].clientX;
        // this.touch.startY = e.touches[0].clientY;

        this.isDrag = true;

        console.log("touch: ", this.touch);
      },
      { passive: false },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();

        if (!this.isDrag) return;

        let currentX = e.touches[0].clientX;

        this.touch.currentX = currentX;

        const directionX = Math.sign(this.touch.startX - currentX);

        if (directionX < 0) {
          console.log("Kanan");
        }
        if (directionX > 0) {
          console.log("Kiri");
        }

        this.touch.startX = currentX;
      },
      { passive: false },
    );

    window.addEventListener("touchend", () => {
      this.isDrag = false;

      console.log("touch end");
    });
  }

  #documentInput() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        console.log("Pindah tab");

        this.isFocus = false;
      } else {
        console.log("Kembali tab");

        this.isFocus = true;
        this.game.resume();
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
