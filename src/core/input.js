export class InputHandler {
  constructor(game) {
    this.game = game;

    this.keys = [];
    this.touch = {
      isTouch: false,
      dragDirection: null,
    };

    this.isFocus = true;

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
        // e.preventDefault();

        this.touch.isTouch = true;
        this.touch.startX = e.touches[0].clientX;
      },
      //{ passive: false },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        // e.preventDefault();
        if (!this.touch.isTouch) return;

        let currentX = e.touches[0].clientX;

        const directionX = Math.sign(currentX - this.touch.startX);

        if (directionX > 0) {
          this.touch.dragDirection = "right";

          console.log("Kanan");
        }
        if (directionX < 0) {
          this.touch.dragDirection = "left";

          console.log("Kiri");
        }

        this.touch.startX = currentX;
      },
      // { passive: false },
    );

    window.addEventListener("touchend", () => {
      this.touch.isTouch = false;
      this.touch.dragDirection = null;

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
